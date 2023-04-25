import { createContext, useState, useEffect } from 'react';
export const Contexto_Funciones = createContext();

export function Contexto_DataProvider(props) {

  return <Contexto_Funciones.Provider value={{
    }}>
    {props.children}
  </Contexto_Funciones.Provider>;
}