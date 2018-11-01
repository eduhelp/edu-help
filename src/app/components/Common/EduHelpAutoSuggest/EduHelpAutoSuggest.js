import React from 'react'
import Autosuggest from 'react-autosuggest'
import { withStyles } from '@material-ui/core/styles'
import './EduHelpAutoSuggest.css'

const styles = {
  textField: {
    padding: '10',
    width: 200,
    margin: 5,
  },
};

export class EduHelpAutoSuggest extends React.Component {
  constructor () {
    super()
    this.state = {
      value: '',
      suggestions: [],
      initSuggestions: [],
    }
  }

  componentWillMount () {
    /* let suggestionArray = []
    console.log(this.props.groupList)
    Object.keys(this.props.groupList).map((option) => {
      suggestionArray.push(option)
    })
    console.log(suggestionArray) */
    this.setState({
      suggestions: this.props.suggestions,
      initSuggestions: this.props.suggestions,
    })
  }

  resetForm () {
    this.setState({
      value: '',
    })
  }

  getSuggestions = inputValue => {
    const inputLength = inputValue.length
    return inputLength === 0 ? [] : this.state.initSuggestions.filter(function (el) {
      return el.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    })
  }

  onSuggestionsClearRequested = () => {
    if (this.props.clearField === 'yes') {
      this.setState({
        value: '',
      })
    }
  }

  getSuggestionValue = (suggestion) => {
    this.props.getSuggestionCallback(this.props.column_id, suggestion)
    return suggestion
  }

  onSuggestChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
    })
    this.getSuggestionValue(newValue)
  }

  renderSuggestion = (suggestion) => {
    return (
      <span>{suggestion}</span>
    )
  }

  render () {
    const { classes } = this.props
    let placeHolderText = this.props.filter_name

    const inputProps = {
      placeholder: placeHolderText,
      value: this.state.value,
      classes,
      onChange: this.onSuggestChange,
      className: classes.textField
    }

    return (<Autosuggest
      suggestions={this.state.suggestions}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
      getSuggestionValue={this.getSuggestionValue}
      renderSuggestion={this.renderSuggestion}
      inputProps={inputProps}
      id={this.props.id}
    />)
  }
}

export default withStyles(styles)(EduHelpAutoSuggest)