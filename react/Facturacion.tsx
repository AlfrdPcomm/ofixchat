import  React, { Component} from 'react'
import FacturacionContainer from './FacturacionContainer'
import { AppKey, AppToken } from './keys'

interface IMyObject {
  value: string;
  label: string;
}

interface objectFormaPago {
  label: string;
  value: string;
}


interface IState {
  optionsCFDI?: IMyObject[];
  optionsFormaPago?: objectFormaPago[];
  // numeroPedido: string;
  selected1?: string;
  cfdi?: {
    Receiver: {
      Name: string;
      CfdiUse: string;
      Rfc: string;
    };
    CfdiType: string;
    NameId: string;
    ExpeditionPlace: string;
    PaymentForm: string;
    PaymentMethod: string;
    Date: string;
    Items : [];

  };
  Form: {
    numeroPedido: string,
    razonSocial : string,
    correo : string,
    rfc : string,
    calle : string,
    telefono : string,
    estado : string,
    numero : string,
    codigoPostal : string,
    colonia: string,
    ciudad: string,
    usoCFDI : string,
    formaPago: string,
    BetweenStreets : string

  };
  errorRFC : string,
  isLoading : boolean;
  showNotification: boolean;
  dropdownEstados: any;
}

var baseURL = 'http://localhost/roga/facturama-php-sdk/';
// var baseURL = 'https://villarrealmuebles.com/facturacion.villarrealmuebles.com/facturacion/';




class Facturacion extends Component<IState, IState>{



  constructor(props: any){
    super(props)

    this.handleChangeBilling = this.handleChangeBilling.bind(this)
    this.handleChangeEstado = this.handleChangeEstado.bind(this)
    this.handleChangeForm = this.handleChangeForm.bind(this)
    this.handleChangeFormaPago =this.handleChangeFormaPago.bind(this)
    this.handleChangeUsoCFDI = this.handleChangeUsoCFDI.bind(this)
    this.handleChangeButton = this.handleChangeButton.bind(this)
    this.closeNotification = this.closeNotification.bind(this)
    this.obtenerEstados = this.obtenerEstados.bind(this)
    this.seleccionarEstado = this.seleccionarEstado.bind(this)
    this.verState = this.verState.bind(this)

    this.state = {
      optionsCFDI :[],
      optionsFormaPago :[],
      // numeroPedido : '',
      cfdi : {
        Receiver : {
          Name : '',
          CfdiUse: '',
          Rfc: ''
        },
        CfdiType: '',
        NameId: '',
        ExpeditionPlace: '',
        PaymentForm: '',
        PaymentMethod: '',
        Date : '',
        Items : []
      },
      selected1  : '',
      Form : {
        numeroPedido : '',
        razonSocial : '',
        correo : '',
        rfc : '',
        telefono : '',
        calle : '',
        estado : '',
        numero : '',
        codigoPostal : '',
        colonia : '',
        ciudad : '',
        usoCFDI : '',
        formaPago : '',
        BetweenStreets : ''
      },
      errorRFC: '',
      isLoading : false,
      showNotification : false,
      dropdownEstados : []
    }

    setTimeout(() => {
      this.getFormaPago();
      this.obtenerEstados();
    }, 1000);



  }


  verState(){
    console.log(this.state)
  }

  async obtenerEstados(){

    var estados : any = null
    try {
      var url = "/api/dataentities/Estados/search?_fields=_all&_schema=mdv1"
      let config = {
        method: 'GET',
        headers:{
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*',
          'X-VTEX-API-AppKey': AppKey,
          'X-VTEX-API-AppToken': AppToken
        },
      }
      let res = await fetch(url, config)
      estados = await res.json()

    } catch (error) {
      console.log('Ocurrio un error al obtener estados', error)
      return false;
    }

    if(estados == null){
      alert('Ocurrio un error al obtener estados')
      return false
    }

    for (let i = 0; i < estados.length; i++) {
      let data: any = {}
      data = {
        "value": estados[i].codEstado,
        "label": estados[i].estado
      };

      await this.setState({
        dropdownEstados : this.state.dropdownEstados?.concat(data)
      })
    }
    console.log(this.state)
    return true

  }

  async handleChangeBilling():Promise<any|boolean>{

    if(this.validarFormularios() === false){
        return false;
    }

    this.setState({
      isLoading : true
    })

    let orden = null

    try {
      var url = '/api/oms/pvt/orders/'+ this.state.Form.numeroPedido;
      let config = {
        method: 'GET',
        headers:{
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*',
          'X-VTEX-API-AppKey': 'vtexappkey-rogamx-SPTEXM',
          'X-VTEX-API-AppToken': 'KHRFJNZDDPHICONZBLATTGYTNMJEGDHNGDYKLHRMFFUFZGEBEIMKFHCDIXSXDUXZHTBYQCNUUOOOLSUGIHAXRWIZBUBNPTILHVXFEFKCURQQTNRQDLPVUZHLLCWVBAEA'
        },
      }
      let res = await fetch(url, config)
      orden = await res.json()
    } catch (error) {
      console.log(error);
      this.setState({isLoading : false})
      return false;
    }


    if(orden.error){
      alert('No se encontro el numero de orden,   ')
      this.setState({isLoading : false})
      return false
    }


    let data: any = {}
    data = {
      "Name": this.state.Form.razonSocial,
      "CfdiUse": this.state.Form.usoCFDI,
      "Rfc": this.state.Form.rfc,
      "CfdiType": "I",
      "NameId": 1,
      "ExpeditionPlace": this.state.Form.codigoPostal,
      "PaymentForm": this.state.Form.formaPago,
      "PaymentMethod": "PUE",
      "Date": "",
      "Street": this.state.Form.calle,
      "Suburb": this.state.Form.colonia,
      "City": this.state.Form.ciudad,
      "Items": []
    };



    var warehouseId = null;
    if(orden.shippingData.logisticsInfo.length > 0){
      if(orden.shippingData.logisticsInfo[0].deliveryIds.length > 0){
        warehouseId = orden.shippingData.logisticsInfo[0].deliveryIds[0].warehouseId;
      }
      else{
        alert('No se encontro datos de la sucursal, contacte con el administrador del sistema')
      return false;
      }
    }
    else{
      alert('No se encontro datos de la sucursal, contacte con el administrador del sistema')
      return false;
    }

    if (warehouseId == null){
      alert('No se encontro datos de la sucursal, contacte con el administrador del sistema')
      return false;
    }




    let newCfdi: any = {}
    newCfdi = {
      "Receiver": {
          "Name": this.state.Form.razonSocial,
          "CfdiUse": this.state.Form.usoCFDI,
          "Rfc": this.state.Form.rfc
      },
      "CfdiType": "I",
      "NameId": 1,
      "ExpeditionPlace": this.state.Form.codigoPostal,
      "PaymentForm": this.state.Form.formaPago,
      "PaymentMethod": "PUE",
      "Date": "",
      "Items": [],
      "warehouseId" : warehouseId,
      "Street": this.state.Form.calle,
      "Suburb": this.state.Form.colonia,
      "City": this.state.Form.ciudad
    };

    for (var i = 0; i < orden.items.length; i++) {

      var formatPrice: any;


      formatPrice = (orden.items[i].sellingPrice / 100);
      var subTotalProducto = (orden.items[i]['quantity'] * formatPrice);
      var precioUnitario = parseFloat(orden.items[i]['sellingPrice']) / 100;



      // formatPrice = (orden.items[i].sellingPrice / 100).toFixed(2);
      // var precioUnitarioSinIVA = (formatPrice / 1.16);
      // var subTotalProductoSinIVA = (orden.items[i]['quantity'] * precioUnitarioSinIVA);
      // var cantidadIVA = (subTotalProductoSinIVA * 0.16);
      // var total = subTotalProductoSinIVA + cantidadIVA


      let items: any = {}
      items = {
          "Quantity": orden.items[i]['quantity'].toString(),
          // "ProductCode": orden.items[i]['id'].toString(),
          "ProductCode" : '',
          "UnitCode": orden.items[i]['measurementUnit'].toString().toUpperCase(),
          "Description": orden.items[i]['name'].toString(),
          "IdentificationNumber": orden.items[i]['refId'].toString(),
          "UnitPrice": precioUnitario.toString(),
          "Subtotal": subTotalProducto.toString(),
          "Discount" : '0',
          // "Taxes": [
          //   {
          //       "Name": "IVA",
          //       "Rate": "0.16",
          //       "Total": cantidadIVA.toFixed(2).toString(),
          //       "Base": subTotalProductoSinIVA.toF   ixed(2).toString(),
          //       "IsRetention": "false"
          //   }],
          "Taxes": [],
          "Total": subTotalProducto.toString()
      }
      // var discount = 0;
      // for (let c = 0; c < orden.items[i]['totals'].length; c++) {
      //   if(c==1){
      //     discount = (orden.items[i]['totals'][c]['value'] / 100)
      //   }
      // }

      var discount = 0;
      for (let c = 0; c < orden.items[i]['priceTags'].length; c++) {
          discount += (orden.items[i]['priceTags'][c]['rawValue'] * -1)
      }
      items['Discount'] = discount;



      if(orden.items[i]['taxCode'] === null || orden.items[i]['taxCode'] === ''){
        items['ProductCode'] = "56101500";
      }
      else{
        items['ProductCode'] = orden.items[i]['taxCode'];
      }

      newCfdi.Items.push(items);
      data.Items.push(items)
    }


    // console.log(newCfdi);
    // this.setState({isLoading : false, showNotification: false})
    // return false;

    /*
    try {
      var urlMasterData = '/api/dataentities/FacturacionV6/documents?_schema=mdv1';
      let options3 = {
        method: 'PATCH',
        headers: {
          Accept: 'application/vnd.vtex.ds.v10+json',
          'Content-Type': 'application/json',
          'X-VTEX-API-AppKey': 'vtexappkey-rogamx-SPTEXM',
          'X-VTEX-API-AppToken': 'KHRFJNZDDPHICONZBLATTGYTNMJEGDHNGDYKLHRMFFUFZGEBEIMKFHCDIXSXDUXZHTBYQCNUUOOOLSUGIHAXRWIZBUBNPTILHVXFEFKCURQQTNRQDLPVUZHLLCWVBAEA'
        },
        body: JSON.stringify(data)
      };
      let response = await fetch(urlMasterData, options3)
      await response.json()
    } catch (error) {
      console.log(error);
      this.setState({isLoading : false})
      return false;
    }

    */


    try {
      var url2 = baseURL +'examples/catalogos/CreateCfdiRequest.php';
      let config2 = {
        method: 'POST',
        // headers:{
        //   'Accept' : 'application/json',
        //   'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin': '*'
        // },
        body: JSON.stringify(newCfdi)
      }
      var res2 = await fetch(url2, config2)
      var request = await res2.json();

      if(request.error == true){
        alert('Error al generar la factura : ' + request.message);
        this.setState({isLoading : false, showNotification: false })
        return false;
      }

      // console.log(request);
      // console.log(JSON.stringify(request.data));
    } catch (error) {
      console.log(error);
      alert('Error al generar la factura : ' + error)
      this.setState({isLoading : false, showNotification: false})
      return false
    }
    this.FormClean();
    this.setState({isLoading : false, showNotification: true })
    return false;
  }


  async handleChangeEstado(selected: any){
    var value = selected['selected1'];
    await this.setState({
      selected1 : value
    })
  }

  async handleChangeForm(e: React.FormEvent<HTMLInputElement>){
    const {name, value} = e.currentTarget;
    this.setState({
      ...this.state,
      Form: { ...this.state.Form, [name]: value}
    })
    if(name == 'rfc'){
      if(this.rfcValido(value) == false){
        this.setState({ errorRFC : 'Ingresa un RFC valido' })
      }
      else{
        await this.setState({ errorRFC : '' })
        this.getUsoCFDI(value);
      }
    }
  }

  closeNotification(flag : any){
    this.setState({
      showNotification : flag
    })
    // console.log(this.state.showNotification);
  }



  async handleChangeFormaPago(value: any){
    // console.log(label.currentTarget);
    var value1 = value['value'];
    // console.log(value1);

    this.setState({
      ...this.state,
      Form: { ...this.state.Form, ['formaPago']: value1}
    })
  }

  async handleChangeUsoCFDI(value: any){
    var valueCFDI = value['value'];
    this.setState({
      ...this.state,
      Form: { ...this.state.Form, ['usoCFDI']: valueCFDI  }
    })
  }


  async getUsoCFDI(rfc: any){
    // console.log(rfc);
    try {
      var url = baseURL +'examples/catalogos/getUsoCFDI.php?rfc=' + rfc;
      let config = {
        method: 'GET',
        headers:{
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        },
      }
      let res = await fetch(url, config)
      let data = await res.json()
      var razonDFI = data.data;
      for (var i = 0; i < razonDFI.length; i++) {
        var obj = [{value: razonDFI[i].Value, label:razonDFI[i].Name}]
        this.setState({
          optionsCFDI: this.state.optionsCFDI?.concat(obj)
        })
      }


    } catch (error) {
      console.log(error);
    }
  }


  handleChangeButton(flag: any){
    // console.log(flag);
    this.setState({
      isLoading : flag
    })
  }

  async getFormaPago(){
    var formaPago = [];
    try {
      var url = baseURL + 'examples/catalogos/getFormasPago.php';
      let config = {
        method: 'GET',
        headers:{
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        },
      }
      let res = await fetch(url, config)
      let data = await res.json();
      formaPago = data.data;
    } catch (error) {
      console.log(error);
    }

    for (var i = 0; i < formaPago.length; i++) {
      var obj = [{value: formaPago[i].Value, label:formaPago[i].Name}]
      await this.setState({
        optionsFormaPago: this.state.optionsFormaPago?.concat(obj)
      })
    }
    // console.log(this.state.optionsFormaPago);

    if(this.state.optionsFormaPago?.length == 0){
      setTimeout(() => {
        this.getFormaPago();
      }, 7000);
    }


    return false;

  }


  validarFormularios(){
    if(this.state.Form.numeroPedido === '' || this.state.Form.numeroPedido === null ){
      alert('Ingrese su numero de pedido')
      return false
    }

    if(this.state.Form.razonSocial === '' || this.state.Form.razonSocial === null ){
      alert('Ingrese la razon social')
      return false
    }

    if(this.state.Form.rfc === '' || this.state.Form.rfc === null ){
      alert('Ingrese el RFC')
      return false
    }

    if(this.state.Form.correo === '' ||this.state.Form.correo === null){
      alert('Ingrese el correo electronico')
      return false
    }

    if (this.validateEmail(this.state.Form.correo) === false) {
      alert('Ingrese el correo correctamente');
      return false
    }

    if(this.state.Form.calle === '' || this.state.Form.calle === null){
      alert('Ingrese la calle y numero')
      return false
    }

    if(this.state.Form.codigoPostal === '' || this.state.Form.codigoPostal === null){
      alert('Ingrese el codigo postal')
      return false
    }

    var isNumber = /^[0-9]+$/;
    if (!this.state.Form.codigoPostal.match(isNumber)){
      alert('El codigo postal debe de ser Numerico')
      return false
   }

    if(this.state.Form.colonia === '' || this.state.Form.colonia === null){
      alert('Ingrese la colonia')
      return false
    }

    if(this.state.Form.ciudad === '' || this.state.Form.ciudad === null){
      alert('Ingrese la ciudad')
      return false
    }

    if(this.state.Form.usoCFDI === '' || this.state.Form.usoCFDI === null){
      alert('Seleccione el uso del CFDI')
      return false
    }

    if(this.state.Form.formaPago === '' || this.state.Form.formaPago === null){
      alert('Seleccione la forma de pago')
      return false
    }
    return true;
  }


  FormClean(){
    this.setState({
      Form : {
        numeroPedido : '',
        razonSocial : '',
        correo : '',
        rfc : '',
        telefono : '',
        calle : '',
        estado : '',
        numero : '',
        codigoPostal : '',
        colonia : '',
        ciudad : '',
        usoCFDI : '',
        formaPago : '',
        BetweenStreets : ''
      }
    })

  }


  validateEmail(email: any) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  rfcValido(rfc: string, aceptarGenerico = true) {
    const re = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
    var validado = rfc.match(re);

    if (!validado)  // Coincide con el formato general del regex?
        return false;

    // Separar el dígito verificador del resto del RFC
    const digitoVerificador = validado.pop(),
        rfcSinDigito = validado.slice(1).join(''),
        len = rfcSinDigito.length,

        // Obtener el digito esperado
        diccionario = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
        indice = len + 1;
    var suma,
        digitoEsperado;

    if (len == 12) suma = 0
    else suma = 481; // Ajuste para persona moral

    for (var i = 0; i < len; i++)
        suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
    digitoEsperado = 11 - suma % 11;
    if (digitoEsperado == 11) digitoEsperado = 0;
    else if (digitoEsperado == 10) digitoEsperado = "A";

    // El dígito verificador coincide con el esperado?
    // o es un RFC Genérico (ventas a público general)?
    if ((digitoVerificador != digitoEsperado)
        && (!aceptarGenerico || rfcSinDigito + digitoVerificador != "XAXX010101000"))
        return false;
    else if (!aceptarGenerico && rfcSinDigito + digitoVerificador == "XEXX010101000")
        return false;
    return rfcSinDigito + digitoVerificador;
}


async seleccionarEstado(estadoSeleccionado : any){
  this.setState({
    Form : {
      ...this.state.Form,
      estado : estadoSeleccionado.seleccion
    }

  })
}


  render(){
		return <FacturacionContainer
              handleChangeBilling={this.handleChangeBilling}
              // handleChangeEstado={this.handleChangeEstado}
              state={this.state}
              handleChangeForm={this.handleChangeForm}
              handleChangeFormaPago={this.handleChangeFormaPago}
              handleChangeUsoCFDI = {this.handleChangeUsoCFDI}
              closeNotification = {this.closeNotification}
              seleccionarEstado = {this.seleccionarEstado}
              verState = {this.verState}
            />
	}

}

export default Facturacion
