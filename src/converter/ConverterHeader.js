import React from 'react';
import accounting from 'accounting';
class ConverterHeader extends React.Component{
    constructor(props){
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    }
    handleValueChange(e){
        this.props.onValueChange(e.target.value);
    }
    handleCurrencyChange(e){
        this.props.onChangeCurrency(e.target.value);
    }
    render(){
        const initValue = this.props.values.initValue;
        const initCurrency = this.props.values.initCurrency;
        return(
        <div className="card-header">
                <div className="row">
                    <div className="col-md-3">
                        <select onChange={this.handleCurrencyChange} className="form-control" value={initCurrency}>
                            {this.props.values.currencies.map((currency,index) => 
                                <option key={index}>{currency}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-9">
                        <input type="number" value={accounting.toFixed(initValue,2)} onChange={this.handleValueChange} className="form-control" name="money" placeholder="Please Input Value"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConverterHeader;