import React, { Component } from 'react';
import axios from 'axios';
import Converter from './converter/Converter';

class App extends Component {
  constructor(){
    super();
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleOpenCurrency = this.handleOpenCurrency.bind(this);
    this.handleAddCurrency = this.handleAddCurrency.bind(this);
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
    this.removeCurrency = this.removeCurrency.bind(this);
    this.state = {
      initValue : 1.00,
      initCurrency: 'USD',
      currencies:['USD','CAD','IDR','GBP','CHF','SGD','INR','MYR','JPY','KRW'],
      rates:[],
      selectedCurrency:null,
      activeCurrencies:[],
      openCurrency:false,
      errorCurrency:"",
      disableCurrency:true
    }
  }

  //Perform First Ajax Call
  componentDidMount(){
    axios.get("https://api.exchangeratesapi.io/latest?base=USD")
    .then(response =>{
      const rates = response.data.rates;
      this.setState({rates:rates});
    })
    .catch(response =>{
      console.log(response); 
    })
  }

  //Functions
  handleValueChange(value){
    this.setState({initValue:value});
  }

  handleOpenCurrency(){
    if(this.state.openCurrency === false){
      this.setState({openCurrency:true});
    }if(this.state.openCurrency === true){
      this.setState({openCurrency:false});
    }
  }
  
  handleAddCurrency(event){
    const target = event.target;
    if(target.type !== 'button'){
      if(target.value !== ""){
        this.setState({errorCurrency:"",disableCurrency:false});
      }else{
        this.setState({errorCurrency:"Choose One Currency",disableCurrency:true})
      }  
      this.setState({selectedCurrency:[target.selectedOptions[0].text,target.value]});
    }
    if(target.type === 'button'){
      if(this.state.activeCurrencies.length === 0){
        this.state.activeCurrencies.push(this.state.selectedCurrency);
        this.setState({openCurrency:false});
      }
      else if(this.state.activeCurrencies[0].indexOf(this.state.selectedCurrency[0]) == -1){
        this.state.activeCurrencies.push(this.state.selectedCurrency);
        this.setState({openCurrency:false});
      }else{
        this.setState({errorCurrency:"Currency Already Exist"});
      }
    }
  }
    
  //Ajax Call For Changing Base Currency
    handleChangeCurrency(value){
      this.setState({initCurrency:value,activeCurrencies:[],rates:[]});
      axios.get("https://api.exchangeratesapi.io/latest?base="+value)
      .then(response =>{
        const rates = response.data.rates;
        if(value === "IDR"){
          this.setState({rates:rates,initValue:1000.00})
        }else{
          this.setState({rates:rates, initValue:1.00});
        }
      })
      .catch(response =>{
        console.log(response); 
      })
    }

    removeCurrency(index){
      this.setState({activeCurrencies:this.state.activeCurrencies.filter((_,i) => i !== index)});
    }
  
  render(){
    return (
      <div className="container">
        <h2 className="text-center">Convert Currency</h2>
        <div className="col-md-6 mx-auto">
          <Converter values={this.state} onValueChange={this.handleValueChange} 
          onAddCurrency={this.handleAddCurrency} onOpenCurrency={this.handleOpenCurrency}
          onChangeCurrency={this.handleChangeCurrency} onRemove={this.removeCurrency}/>
        </div>
      </div>
    );
  }
}

export default App;
