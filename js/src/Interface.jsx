import React, { useState } from 'react';
import { XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

import Knob from './Knob.jsx';
import Lockup from './Lockup_Dark2.svg';

import manifest from '../../manifest.json';


function ErrorAlert({message, reset}) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={reset}
              className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// The interface of our plugin, exported here as a React.js function
// component.
//
// We use the `props.requestParamValueUpdate` callback provided by the parent
// component to propagate new parameter values to the host.
export default function Interface(props) {
  const colorProps = {
    meterColor: '#EC4899',
    knobColor: '#64748B',
    thumbColor: '#F8FAFC',
  };

  let params = manifest.parameters.map(({paramId, name, min, max, defaultValue}) => {
    let currentValue = props[paramId] || 0;

    return {
      paramId,
      name,
      value: currentValue,
      readout: `${Math.round(currentValue * 100)}%`,
      setValue: (v) => props.requestParamValueUpdate(paramId, v),
    };
  });

  return (
    <div className="w-full h-screen min-w-[492px] min-h-[238px] bg-slate-800 bg-mesh p-8">
      <div className="h-1/5 flex justify-between items-center text-md text-slate-400">
        <img src={Lockup} className="h-8 w-auto" />
        <span className="font-bold">SRVB</span>
      </div>
      <div className="flex flex-col h-4/5">
        {props.error && (<ErrorAlert message={props.error.message} reset={props.resetErrorState} />)}
        <div className="flex flex-1">
          {params.map(({name, value, readout, setValue}) => (
            <div key={name} className="flex flex-col flex-1 justify-center items-center">
              <Knob className="h-20 w-20 m-4" value={value} onChange={setValue} {...colorProps} />
              <div className="flex-initial mt-2">
                <div className="text-sm text-slate-50 text-center font-light">{name}</div>
                <div className="text-sm text-pink-500 text-center font-light">{readout}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}