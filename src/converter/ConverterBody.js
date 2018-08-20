import React from 'react';
import accounting from 'accounting';

class ConverterBody extends React.Component{
    constructor(props){
        super(props);
        this.removeCurrency = this.removeCurrency.bind(this);
    }
    removeCurrency(value,index){
        this.props.onRemove(value,index);
    }
    render(){
        const activeCurrencies = this.props.activeCurrencies;
        const initCurrency = this.props.initCurrency;
        const initValue = this.props.initValue;
        return(
            <div className="card-body">
            {activeCurrencies.map((active, index)=>
                <div key={index} className="list-group">
                    <li className="list-group-item mt-2 mb-2">
                        <div className='row'>      
                        <div className="col-md-3">
                                <h4>{active[0]}</h4>
                            </div>
                            <div className="col-md-7 text-right">
                                <h4>{accounting.formatMoney((initValue * active[1]),{
                                    symbol: active[0],
                                    precision: 2,
                                    thousand: "·",
                                    format: {
                                        pos : "%s %v",
                                        neg : "%s (%v)",
                                        zero: "%s  --"
                                    }})}</h4>
                            </div>
                            <div className="col-md-2"><button className="btn btn-danger form-control" onClick={()=>this.removeCurrency(index)}>&times;</button></div>
                        </div>
                        <p>{initCurrency === "IDR" ? 100 : 1} {initCurrency} = {active[0] + " " + active[1]}</p>
                    </li>
                </div>
            )}
            </div>
        )
    }
}

export default ConverterBody;