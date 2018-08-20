import React from 'react';

class ConverterFooter extends React.Component{
    constructor(props){
        super(props);
        this.handleOpenCurrency = this.handleOpenCurrency.bind(this);
        this.handleAddCurrency = this.handleAddCurrency.bind(this);
    }
    handleOpenCurrency(e){
        this.props.onOpenCurrency(e);
    }
    handleAddCurrency(e){
        this.props.onAddCurrency(e);
    }
    render(){
        const rates = this.props.rates;
        const error = this.props.errorCurrency;
        const openCurrency = this.props.openCurrency;
        const disableCurrency = this.props.disableCurrency;
        return(
            <div className="card-footer text-center">
                <button hidden={openCurrency} className="btn btn-info" onClick={this.handleOpenCurrency}>Add More Currencies</button>
                <div hidden={!openCurrency} className="input-group mx-auto">
                    <select className="form-control" onChange={this.handleAddCurrency}>  
                        <option value="">Choose One</option>
                        {Object.keys(rates).map((rate) => 
                            <option key={rate} currency={rate} value={rates[rate]}>{rate}</option>                
                        )}
                    </select>
                    <div className="input-group-append">
                        <button disabled={disableCurrency} className="btn btn-success" type="button" onClick={this.handleAddCurrency}>Add Currency</button>
                        <button className="btn btn-warning" onClick={this.handleOpenCurrency}>Cancel</button>
                    </div>
                </div>
                <h4 style={{'color':'red'}} className={'text-center'}>{error}</h4>
            </div>
        )
    }
}

export default ConverterFooter;