import React from 'react';
import ConverterHeader from './ConverterHeader';
import ConverterFooter from './ConverterFooter';
import ConverterBody from './ConverterBody';

class Converter extends React.Component{
    render(){
        return(
            <div className="card">
                <ConverterHeader values={this.props.values} 
                onValueChange={this.props.onValueChange} onChangeCurrency={this.props.onChangeCurrency}/>
                
                <ConverterBody activeCurrencies={this.props.values.activeCurrencies} 
                initCurrency={this.props.values.initCurrency} initValue={this.props.values.initValue}
                rates={this.props.values.rates} onRemove={this.props.onRemove}/>
                
                <ConverterFooter rates={this.props.values.rates} errorCurrency={this.props.values.errorCurrency}
                disableCurrency={this.props.values.disableCurrency}
                openCurrency={this.props.values.openCurrency} 
                onOpenCurrency={this.props.onOpenCurrency} 
                onAddCurrency={this.props.onAddCurrency}/>
            </div>
        );
    }
}

export default Converter;