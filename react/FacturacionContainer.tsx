import React, { Fragment } from 'react'
import { Input, Button, Dropdown, Alert  } from 'vtex.styleguide'


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


      <div>
        <h3>Solicitud de facturación</h3>
        <p>Favor de llenar los datos solicitados. En cuanto la hayamos generado se te enviará vía correo electrónico.</p>

        { state.showNotification
            ? <><Alert type="success" onClose={() => closeNotification(false)}>
            Tu factura se encuentra en proceso de envio al correo que proporcionaste
          </Alert><br /></>
            : null
        }

        <form autoComplete="off">
        {/* <form > */}
          <div className="mb5">
            <Input  placeholder="000000000000000" size="small" label="Numero de Pedido"  name="numeroPedido" value={state.Form.numeroPedido || ''} onChange={handleChangeForm} errorMessage=""/>
          </div>

          <div className="mb5">
            <Input placeholder="Empresa SA de CV" size="small" label="Razon Social" name="razonSocial"  value={state.Form.razonSocial}  onChange={handleChangeForm} errorMessage="" />
          </div>

          <div className="flex">
            <div className="w-50">
              <div className="mb5">
                <Input  placeholder="XXX1902127X3" size="small" label="RFC" name="rfc" value={state.Form.rfc}  onChange={handleChangeForm} errorMessage={state.errorRFC}/>
              </div>
            </div>
            <div><div className="pr5 mb4 mr4 dib c-emphasis bg-muted-4"></div></div>
            <div className="w-50">
              <div className="mb5">
                <Input type="email" placeholder="correo@ejemplo.com" size="small" label="Correo electronico" name="correo" value={state.Form.correo}  onChange={handleChangeForm}/>
                </div>
            </div>
          </div>

          <p className="vtex-input__label db mb3 w-100 c-on-base t-small ">Domicilio Fiscal</p>
          <div className="flex">
            <div className="w-50">
              <div className="mb5">
                <Input placeholder="Calle" size="small" name="calleNumero" value={state.Form.calle}  onChange={handleChangeForm}/>
              </div>
            </div>

            <div><div className="pr5 mb4 mr4 dib c-emphasis bg-muted-4"></div></div>

            <div className="w-50">
              <div className="mb5">
                <Input placeholder="Código postal" size="small" name="codigoPostal" value={state.Form.codigoPostal}  onChange={handleChangeForm}/>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-50">
              <div className="mb5">
                <Input placeholder="Colonia" size="small" name="colonia" value={state.Form.colonia}  onChange={handleChangeForm} />
              </div>
            </div>

            <div><div className="pr5 mb4 mr4 dib c-emphasis bg-muted-4"></div></div>

            <div className="w-50">
              <div className="mb5">
                <Input placeholder="Ciudad" size="small" name="ciudad" value={state.Form.ciudad}  onChange={handleChangeForm}/>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-50">
              <div className="mb5">
                <Dropdown
                  label="Uso de CFDI"
                  size="small"
                  options={state.optionsCFDI}
                  value={state.Form.usoCFDI}
                  onChange={(_: any, v: any) => handleChangeUsoCFDI ({ value: v })}
                />
              </div>
            </div>

            <div><div className="pr5 mb4 mr4 dib c-emphasis bg-muted-4"></div></div>

            <div className="w-50">
              <Dropdown
                  label="Forma de Pago"
                  size="small"
                  options={state.optionsFormaPago}
                  value={state.Form.formaPago}
                  onChange={(_: any, v: any) => handleChangeFormaPago ({value: v })}
              />
            </div>
          </div>
          <div className="mb4">
            <Button variation="primary" block onClick={handleChangeBilling} isLoading={state.isLoading}>
              Enviar
            </Button>
          </div>
        </form>
      </div>

    </Fragment>
  )
}

export default FacturacionContainer
