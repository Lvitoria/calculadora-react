import React, {Component} from 'react';
import '../main/Calculadora.css';
import Button from '../components/Button';
import Display  from '../components/Display';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0
}

export default class Calculadora extends Component{
    
    //criou um clone desse objeto e passou para o state
    state = { ...initialState }
    
    //rever essa aula
    constructor(props){
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }
    
    clearMemory(){
        console.log("limpa");
        this.setState({ ...initialState })
    }
    
    setOperation(operation){
        console.log(operation);
        
        if(this.state.current === 0){
            this.setState({ operation, current: 1, clearDisplay: true})
        }else{
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e){
                console.log(e);
                values[0] = this.state.values[0]
            }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
            })

        }
    }

    addDigit(n){

        if(n === '.' && this.state.displayValue.includes('.')){
            return
        }

        //o clearDisplay é uma flag
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    
        // o clearDisplay se for true  portanto ele vai pegar o valor que esta no json 
        // initialState = { displayValue
    
        const currentValue  = clearDisplay ? '' : this.state.displayValue
       
        console.log(currentValue);

        const valor  =  currentValue + n
        // ou posso usar o mesmo nome displayValue
        //ai fica assim
        // this.setState({ displayValue, clearDisplay: false})
        this.setState({ displayValue: valor, clearDisplay: false})

        if(n !== "."){
            const i = this.state.current
            const nemValue = parseFloat(valor)
            const values = [ ...this.state.values]
            values[i] = nemValue
            this.setState({ values})
            console.log(values);
        }
    }

    render(){
    
        return(
            <div className="calculadora">
                <Display value={this.state.displayValue } />
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation />
                <Button label="7"  click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4"  click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}