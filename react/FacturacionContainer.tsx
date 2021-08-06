import React, { Fragment } from 'react'
import { Input, Button, Dropdown, Alert  } from 'vtex.styleguide'
import styles from './styles.css'

function FacturacionContainer({ handleChangeBilling,
                                // handleChangeEstado,
                                state,
                                handleChangeForm,
                                handleChangeFormaPago,
                                handleChangeUsoCFDI,
                                closeNotification,
                                seleccionarEstado,
                                verState
                              }
                              : 
                              {
                                handleChangeBilling: any,
                                // handleChangeEstado: any,
                                state:any,
                                handleChangeForm:any,
                                handleChangeFormaPago: any,
                                handleChangeUsoCFDI: any,
                                closeNotification: any,
                                seleccionarEstado : any,
                                verState : any
                              }
                              ){

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

         <button onClick={verState} style={{display : 'none'}}>Ver state</button>

        <form autoComplete="off" className={styles.formContainer}>
        {/* <form > */}
          <h2 className="vtex-input__label db mb3 w-100 c-on-base t-body lh-copy">Datos Generales</h2>
          <div className={styles.numPedido}>
            <Input  placeholder="0000000000000-00" 
                    size="Regular" 
                    label="Número de Pedido"  
                    name="numeroPedido" 
                    value={state.Form.numeroPedido || ''} 
                    onChange={handleChangeForm} 
                    errorMessage=""
                    prefix="🛍️"
            />
          </div>

          <div className={styles.idTwo}>
            <div className={styles.inTwo}>
              <Input  placeholder="Empresa SA de CV" 
                      size="Regular" 
                      label="Razon Social" 
                      name="razonSocial"  
                      value={state.Form.razonSocial}  
                      onChange={handleChangeForm} 
                      errorMessage="" 
                      prefix="📝"
              />
            </div>
            <div className={styles.inTwo}>
              <Input  placeholder="XXX1902127X3" 
                      size="Regular" 
                      label="RFC" 
                      name="rfc" 
                      value={state.Form.rfc}  
                      onChange={handleChangeForm} 
                      errorMessage={state.errorRFC}
                      prefix="📑"
              />
            </div>
          </div>

          <div className={styles.idTwo}>
            <div className={styles.inTwo}>
              <Input  type="email" 
                      placeholder="correo@ejemplo.com" 
                      size="Regular" 
                      label="Correo Electrónico" 
                      name="correo" 
                      value={state.Form.correo}  
                      onChange={handleChangeForm}
                      prefix="✉️"
              />
            </div>
            <div className={styles.inTwo}>
              <Input type="tel" 
                      placeholder="0000000000" 
                      size="Regular" 
                      label="Teléfono" 
                      name="telefono" 
                      value={state.Form.telefono}
                      onChange={handleChangeForm}
                      prefix="📞"
              />
            </div>
          </div>

          <h2 className="vtex-input__label db mb3 w-100 c-on-base t-body lh-copy">Domicilio Fiscal</h2>

          <div className={styles.idTwo}>
            <div className={styles.inTwo}>
              <Input  label="Calle" 
                      placeholder="Calle" 
                      size="Regular" 
                      name="calle" 
                      value={state.Form.calle}
                      onChange={handleChangeForm}
                      prefix="🛣️"
              />
            </div>
            <div className={styles.idThree}>
              <div className={styles.inThree}>
                <Input  label="Numero de Casa"  
                        placeholder="Número" 
                        size="Regular" 
                        name="numero" 
                        value={state.Form.numero}
                        onChange={handleChangeForm}
                        prefix="🏡"
                />
              </div>
              <div className={styles.inThree}>
                <Input  label="Código postal"  
                        placeholder="Código postal" 
                        size="Regular" 
                        name="codigoPostal" 
                        value={state.Form.codigoPostal}  
                        onChange={handleChangeForm}
                        prefix="📪"
                />
                        
              </div>
            </div>
          </div>
          
          <div className={styles.idTwo}>
            <div className={styles.inTwo}>
              <Input  label="Entre calles o intersección" 
                      placeholder="Entre Calles" 
                      size="Regular" 
                      name="BetweenStreets"  
                      value={state.Form.BetweenStreets}
                      onChange={handleChangeForm} 
                      errorMessage=""
                      prefix="🗺️"
              />
            </div>
            <div className={styles.inTwo}>
              <Input  label="Colonia" 
                      placeholder="Colonia" 
                      size="Regular" 
                      name="colonia" 
                      value={state.Form.colonia}  
                      onChange={handleChangeForm} 
                      prefix="🏬"
                      
              />
            </div>
          </div>

          <div className={styles.idTwo}>
            <div className={styles.inTwo}>
              <Input  label="Ciudad"
                      placeholder="Ciudad (Municipio)" 
                      size="Regular" 
                      name="ciudad" 
                      value={state.Form.ciudad}  
                      onChange={handleChangeForm}
                      prefix="🏙️"
              />
            </div>
            <div className={styles.inTwo}>
              <Dropdown
                label="Estado"
                placeholder="Estado"
                size="Regular"
                value={state.Form.estado}
                options={state.dropdownEstados}
                onChange={(_ : any, v : any) => seleccionarEstado({ seleccion: v })}
              />

            </div>
          </div>

          <div className={styles.idTwo}>
            <div className={styles.inTwo}>
              <Dropdown
                  label="Uso de CFDI"
                  placeholder="Uso de CFDI"
                  size="Regular"
                  options={state.optionsCFDI}
                  value={state.Form.usoCFDI}
                  onChange={(_: any, v: any) => handleChangeUsoCFDI ({ value: v })}
              />
            </div>
            

            <div className={styles.inTwo}>
              <Dropdown
                  label="Forma de Pago"
                  placeholder="Forma de Pago"
                  size="Regular"
                  options={state.optionsFormaPago}
                  value={state.Form.formaPago}
                  onChange={(_: any, v: any) => handleChangeFormaPago ({value: v })}
              />
            </div>
          </div>

          <div className={styles.butContainer}>
            <Button className={styles.boton} 
                    variation="primary" 
                    block 
                    onClick={handleChangeBilling} 
                    isLoading={state.isLoading} >
              Enviar
            </Button>
          </div>
        </form>
      </div>

    </Fragment>
  )
}

export default FacturacionContainer