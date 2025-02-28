import _isEqual from 'lodash.isequal'
import dynamic from 'next/dynamic'
import { ChangeEvent, Dispatch } from 'react'

import { PresetSchemaNameWithCustom, TEMPLATE_OPTIONS } from '@/lib/constants'
import { Action, State } from '@/lib/state'
import { cx } from '@/lib/utils'

import { ArrowDownIcon } from '../Icons'

const JSONEditor = dynamic(() => import('@/components/JSONEditor'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

type BuildStepProps = {
  state: State
  dispatch: Dispatch<Action>
}

export default function BuildStep({ state, dispatch }: BuildStepProps) {
  const isSaved = Object.keys(state.schema).length > 0

  const onTemplateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'setTemplate',
      payload: e.target.value as PresetSchemaNameWithCustom,
    })
  }

  const onPreviewClick = () => {
    dispatch({ type: 'setSchema', payload: null })
  }

  const onStartGenerationClick = () => {
    dispatch({
      type: 'setSchemaAndStartGenerating',
      payload: {
        onMessage: ({ data }) =>
          dispatch({
            type: 'setSentMessages',
            payload: data,
          }),
        onError: console.error,
      },
    })
  }

  return (
    <div id="build-step" className="px-10 pt-8 pb-10 bg-white rounded-lg">
      <h3 className="text-lg font-semibold">Schema Designer</h3>

      <div className="h-6" />

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Schema</p>

        <select
          className="input-base"
          value={state.template}
          onChange={onTemplateChange}
          disabled={state.isGenerating}
        >
          {TEMPLATE_OPTIONS.map(presetSchemaName => (
            <option key={presetSchemaName} value={presetSchemaName}>
              {presetSchemaName}
            </option>
          ))}
        </select>
      </div>

      <div className="h-4" />

      <JSONEditor
        readOnly={state.isGenerating}
        content={state.content}
        onChange={content => dispatch({ type: 'setContent', payload: content })}
        statusBar={false}
        onRenderMenu={(items, _context) =>
          items.filter(item => ('text' in item ? item.text !== 'table' : true))
        }
      />

      {state.errors.length > 0 && (
        <ul className="my-4">
          {state.errors.map(validationError => (
            <li key={validationError} className="text-red-500">
              {validationError}
            </li>
          ))}
        </ul>
      )}

      <div className="h-6" />

      <p className="text-sm font-semibold">Preview</p>

      <div className="h-4" />

      <div className="preview">{state.sampleCode}</div>

      <div className="h-6" />

      <div className="flex justify-end gap-6">
        <button
          className={cx(
            'py-[10px] px-[14px] flex items-center gap-4 bg-tb-primary rounded-[4px] shadow-[0px_1px_3px_rgba(11,19,36,0.1)] text-sm text-white tracking-[-0.01em] hover:scale-105'
          )}
          onClick={onPreviewClick}
        >
          <span>Preview</span>
        </button>

        {state.step === 2 && (
          <button
            type="button"
            className="btn-base btn-primary"
            onClick={onStartGenerationClick}
          >
            Start Generating! <ArrowDownIcon />
          </button>
        )}
      </div>
    </div>
  )
}
