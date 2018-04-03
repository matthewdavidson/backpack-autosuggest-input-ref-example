import React, { Component } from 'react';
import BpkInput from 'bpk-component-input';
import { withRtlSupport } from 'bpk-component-icon';
import FlightIcon from 'bpk-component-icon/lg/flight';
import BpkAutosuggest, { BpkAutosuggestSuggestion } from 'bpk-component-autosuggest';

const BpkFlightIcon = withRtlSupport(FlightIcon);

const offices = [
  {
    name: 'Barcelona',
    code: 'BCN',
    country: 'Spain',
  },
];

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : offices.filter(office =>
    office.name.toLowerCase().indexOf(inputValue) !== -1,
  );
};

const getSuggestionValue = ({ name, code }) => `${name} (${code})`;

const renderSuggestion = suggestion => (
  <BpkAutosuggestSuggestion
    value={getSuggestionValue(suggestion)}
    subHeading={suggestion.country}
    tertiaryLabel="Airport"
    indent={suggestion.indent}
    icon={BpkFlightIcon}
  />
);

export default class Autosuggest extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  onChange = (e, { newValue }) => {
    this.setState(() => ({
      value: newValue,
    }));
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState(() => ({
      suggestions: getSuggestions(value),
    }));
  }

  onSuggestionsClearRequested = () => {
    this.setState(() => ({
      suggestions: [],
    }));
  }

  renderInputComponent = (inputProps) => {
    const { ref, inputRef, ...rest } = inputProps;

    return (
      <BpkInput
        inputRef={(element) => {
          ref(element);

          if (typeof inputRef === 'function') {
            inputRef(element);
          }
        }}
        {...rest}
      />
    );
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      id: 'my-autosuggest',
      name: 'Office',
      placeholder: 'Enter an office name',
      value,
      onChange: this.onChange,
      inputRef: () => console.log('this works!'),
    };

    return (
      <BpkAutosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        renderInputComponent={this.renderInputComponent}
      />
    );
  }
}
