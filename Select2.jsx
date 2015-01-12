/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var $ = window.jQuery = require('jquery');
var _ = require('lodash');
require('select2');
require('select2/select2.css');

var Select2 = React.createClass({
    propTypes: {
        children: React.PropTypes.array, // Array of <option /> components to be placed into the select
        themeName: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        multiple: React.PropTypes.bool,
        defaultValue: React.PropTypes.string,
        onChange: React.PropTypes.func,
        formatResult: React.PropTypes.func,
        formatSelection: React.PropTypes.func,
    },

    getInitialState() {
        return {
            wasDestroyed: false
        };
    },

    componentDidMount() {
        this._createSelect();
        $(this.getDOMNode()).on('change', this._handleChange);
    },

    componentWillUnmount() {
        var $rootNode = $(this.getDOMNode());
        // console.log('componentWillUnmount', this.props.name, $rootNode.length);
        $rootNode.off('change', this._handleChange);
        $rootNode.select2('destroy');
    },

    componentWillReceiveProps(nextProps) {
        // if new props recieved we need to destoy select2 and build it in componentDidUpdate later
        if ( !_.isEqual(nextProps.defaultValue,this.props.defaultValue)
             || !_.isEqual(nextProps.disabled,this.props.disabled) ) {
            $(this.getDOMNode()).select2('destroy');

            this.setState({
                wasDestroyed: true
            });
        }
    },
    
    componentDidUpdate() {
        if (this.state.wasDestroyed) {
            this._createSelect();
            this.setState({
                wasDestroyed: false
            });
        }
    },

    _handleChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e.val);
        }
    },

   _createSelect(){
        var $rootNode = $(this.getDOMNode());
        var themeName = this.props.themeName;
        $rootNode.select2({
            formatResult: this.props.formatResult,
            formatSelection: this.props.formatSelection,
            escapeMarkup(m) { return m; },
            minimumResultsForSearch: -1,
            containerCssClass: themeName ? themeName + '-container' : '',
            dropdownCssClass: themeName ? themeName + '-dropdown' : '',
            adaptContainerCssClass: themeName ? themeName + '-adaptContainer' : '',
            adaptDropdownCssClass: themeName ? themeName + '-adaptDropdown' : '',
        });

        this.setSelectValue(this.props.defaultValue);

        $rootNode.select2('enable', !this.props.disabled);
    },

    setSelectValue(value) {
        var $rootNode = $(this.getDOMNode());
        if (this.props.defaultValue !== null) {
            $rootNode.select2('val', value);
        }
    },

    getSelectedValue() {
        return $(this.getDOMNode()).val();
    },

    render() {
        return  (
            <select defaultValue={this.props.defaultValue}
                    multiple={this.props.multiple}
                    name='select'
                    key={this.props.key+ 'SELECT2'}>
                {this.props.children}
            </select>
        );
    },
});

module.exports = Select2;