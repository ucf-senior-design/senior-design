import React from "react"
export interface valuesHookProps {
  /**
   * Array of string values to be in the select list
   */
  initSelected?: Array<string>
  /**
   * Array of string values to initilize as selected
   */
  options: Array<string>
}

export interface SelectListHook {
  /**
   * Readable values in the hook.
   */
  values: Values
  /**
   * Adds another selectable option to the list.
   */
  addOption: () => void
  /**
   * Toggles whether or not a value has been selected.
   */
  updateSelected: (option: string) => void
  /**
   * Returns whether or not a chip is currently selected.
   */
  isSelected: (option: string) => boolean
  /**
   * Handles the visibility of the popup that allows the user to add a custom option.
   */
  togglePopUp: () => void
  /**
   * Reads input of the custom option a user inputs.
   */
  updateOptionInput: (option: string) => void
}

interface Values {
  optionInput: string
  isPopUpVisible: boolean
  selected: Set<string>
  options: Array<string>
}
export function SelectListHook(props: valuesHookProps): SelectListHook {
  const [values, setValues] = React.useState<Values>({
    optionInput: "",
    isPopUpVisible: false,
    selected: new Set(props.initSelected) ?? new Set(),
    options: props.options,
  })

  function isSelected(option: string): boolean {
    return values.selected.has(option)
  }

  function updateOptionInput(option: string) {
    setValues((values) => ({
      ...values,
      optionInput: option,
    }))
  }
  function addOption() {
    if (values.optionInput.length === 0) {
      setValues((values) => ({
        ...values,
        isPopUpVisible: false,
      }))
      return
    }

    const nSelect = values.selected
    const nOptions = values.options

    nSelect.add(values.optionInput)
    nOptions.push(values.optionInput)

    setValues({
      optionInput: "",
      isPopUpVisible: false,
      selected: nSelect,
      options: nOptions,
    })
  }

  function updateSelected(option: string) {
    const nSelect = values.selected
    if (isSelected(option)) {
      nSelect.delete(option)
    } else {
      nSelect.add(option)
    }

    setValues((values) => ({
      ...values,
      selected: nSelect,
    }))
  }

  function togglePopUp() {
    setValues((values) => ({
      ...values,
      isPopUpVisible: !values.isPopUpVisible,
    }))
  }

  return {
    values,
    addOption,
    updateSelected,
    isSelected,
    togglePopUp,
    updateOptionInput,
  }
}
