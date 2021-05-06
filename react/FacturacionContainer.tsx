import React, { Fragment } from 'react'
import { Input, Button, Dropdown, Alert  } from 'vtex.styleguide'

import styles from './styles.css'


// import { PageBlock } from 'vtex.styleguide'

function FacturacionContainer({handleChangeBilling,
                              // handleChangeEstado,
                              state,
                              handleChangeForm,
                              handleChangeFormaPago,
                              handleChangeUsoCFDI,
                              closeNotification
                            }: {
                                handleChangeBilling: any,
                                // handleChangeEstado: any,
                                state:any,
                                handleChangeForm:any,
                                handleChangeFormaPago: any,
                                handleChangeUsoCFDI: any,
                                closeNotification: any
                              } ){

  return(
    <Fragment>


      <div className={styles.facturacionContainer}>
        <h3 className={styles.h3}>Solicitud de facturación</h3>
        <p className={styles.disclosure}>Favor de llenar los datos solicitados. Al generar la factura se te enviará vía correo electrónico.</p>

        { state.showNotification
            ? <><Alert type="success" onClose={() => closeNotification(false)}>
            Tu factura se encuentra en proceso de envio al correo que proporcionaste
          </Alert><br /></>
            : null
        }

        <form autoComplete="off" className={styles.formContainer}>
        {/* <form > */}
          <div className={styles.numPedido}>
            <Input  placeholder="000000000000000" size="small" label="Numero de Pedido"  name="numeroPedido" value={state.Form.numeroPedido || ''} onChange={handleChangeForm} errorMessage=""/>
          </div>

          <div className={styles.idTwo}>
            <div className={styles.inTwo}>
              <Input placeholder="Empresa SA de CV" size="small" label="Razon Social" name="razonSocial"  value={state.Form.razonSocial}  onChange={handleChangeForm} errorMessage="" />
            </div>
            <div className={styles.inTwo}>
              <Input  placeholder="XXX1902127X3" size="small" label="RFC" name="rfc" value={state.Form.rfc}  onChange={handleChangeForm} errorMessage={state.errorRFC}/>
            </div>
          </div>

          <div className={styles.idTwo}>
            <div className={styles.inTwo}>
              <Input type="email" placeholder="correo@ejemplo.com" size="small" label="Correo Electrónico" name="correo" value={state.Form.correo}  onChange={handleChangeForm}/>
            </div>
            <div className={styles.inTwo}>
              <Input type="tel" placeholder="0000000000" size="small" label="Teléfono" name="telefono" value={state.Form.telefono}  onChange={handleChangeForm} errorMessage={state.errorRFC}/>
            </div>
          </div>

          <p className="vtex-input__label db mb3 w-100 c-on-base t-small ">Domicilio Fiscal</p>

          <div className={styles.idTwo}>
            <div className={styles.inTwo}>
              <Input placeholder="Calle" size="small" name="calle" value={state.Form.calle}  onChange={handleChangeForm}/>
            </div>
            <div className={styles.idThree}>
              <div className={styles.inThree}>
                <Input placeholder="Número" size="small" name="numero" value={state.Form.numero}  onChange={handleChangeForm}/>
              </div>
              <div className={styles.inThree}>
                <Input placeholder="Código postal" size="small" name="codigoPostal" value={state.Form.codigoPostal}  onChange={handleChangeForm}/>
              </div>
            </div>
          </div>

          <p className="vtex-input__label db mb3 w-100 c-on-base t-small ">Entre calles o intersección</p>

          <div className={styles.idTwo}>
            <div className={styles.inTwo}>
              <Input placeholder="Calles" size="small" name="BetweenStreets"  value={state.Form.BetweenStreets}  onChange={handleChangeForm} errorMessage="" />
            </div>
            <div className={styles.inTwo}>
              <Input placeholder="Colonia" size="small" name="colonia" value={state.Form.colonia}  onChange={handleChangeForm} />
            </div>
          </div>

          <div className={styles.idTwo}>
            <div className={styles.inTwo}>
              <Input placeholder="Ciudad" size="small" name="ciudad" value={state.Form.ciudad}  onChange={handleChangeForm}/>
            </div>
            <div className={styles.inTwo}>
              <Input placeholder="Estado" size="small" name="estado" value={state.Form.estado}  onChange={handleChangeForm}/>
            </div>
          </div>

          <div className={styles.idTwo}>
            <div className={styles.inTwo}>
              <Dropdown
                label="Uso de CFDI"
                size="small"
                options={state.optionsCFDI}
                value={state.Form.usoCFDI}
                onChange={(_: any, v: any) => handleChangeUsoCFDI ({ value: v })}
              />
            </div>

            <div className={styles.inTwo}>
              <Dropdown
                  label="Forma de Pago"
                  size="small"
                  options={state.optionsFormaPago}
                  value={state.Form.formaPago}
                  onChange={(_: any, v: any) => handleChangeFormaPago ({value: v })}
              />
            </div>
          </div>

          <div className={styles.butContainer}>
            <Button className={styles.boton} variation="primary" block onClick={handleChangeBilling} isLoading={state.isLoading}>
              Enviar
            </Button>
          </div>
        </form>
      </div>

    </Fragment>
  )
}

export default FacturacionContainer
