import React,{Component} from 'react';
import Input from '../../../components/UI/Input/Input';
import './Register.css';
import axios from 'axios';
class Register extends Component{
    state ={
        controls:{
            // firstName:{
            //     elementType:'input',
            //     value:'',
            //     label:'First Name',
            //     elementConfig:{
            //         type:'text',
            //         placeholder:'First Name'
            //     },
            //     validation:{
            //         required:true,
            //         isEmail: false
            //     },
            //     isValid: false,
            //     touched:false
            // },
            // lastName:{
            //     elementType:'input',
            //     value:'',
            //     label:'Last Name',
            //     elementConfig:{
            //         type:'text',
            //         placeholder:'Last Name'
            //     },
            //     validation:{
            //         required:true,
            //         isEmail: false
            //     },
            //     isValid: false,
            //     touched:false
            // },
            // age:{
            //     elementType:'input',
            //     value:'',
            //     label:'Date of Birth',
            //     elementConfig:{
            //         type:'date',
            //         placeholder:'Age'
            //     },
            //     validation:{
            //         required:true,
            //         isEmail: false
            //     },
            //     touched:false
            // },
            email:{
                elementType:'input',
                value:'',
                // label:'Email',
                elementConfig:{
                    type:'email',
                    placeholder:'Email'
                },
                validation:{
                    required:true,
                    isEmail: true
                },
                isValid: false,
                touched:false
            },
            password:{
                elementType:'input',
                value:'',
                // label:'Password',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                validation:{
                    required:true,
                    minLength:6
                },
                isValid: false,
                touched:false
            },
            confirmPassword:{
                elementType:'input',
                value:'',
                // label:'Confirm Password',
                elementConfig:{
                    type:'password',
                    placeholder:'Confirm Password'
                },
                validation:{
                    required:true,
                    isConfirmPassword:true,

                },
                isValid: false,
                touched:false
            }
        },
        isSignedUp:false,
        isErr:false,
        error:null
    }
    componentDidMount(){
        
    //    if(!this.props.buildingBurger  && this.props.authRedirectPath !== '/') 
    //         {
    //             this.props.onSetAuthRedirectPath()}        
    }
    validationCheck=(validation,value)=>{
        let isValid = true;
        
        if (validation.required){
            isValid = value.trim() !== '' && isValid; 
        }
        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid; 
        }
        if(validation.maxLength){
            isValid = value.length <= validation.maxLength && isValid; 
        }
        if (validation.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }
        if(validation.isConfirmPassword){
            isValid=this.state.controls.password.value === value && isValid;
        }
        
        return isValid
    }

    inputChangeHandler=(event,id)=>{
        
        const updatedControls ={
            ...this.state.controls,
            [id]:{
                ...this.state.controls[id],
                value : event.target.value,
                isValid : this.validationCheck(this.state.controls[id].validation,event.target.value),
                touched:true
            }
        
        };
        
        this.setState({
            controls:updatedControls,
            
        })
    }
    submitHandler=(event)=>{
        event.preventDefault();
        const postSignup = {
            
            email:this.state.controls.email.value,
            password:this.state.controls.password.value,
            returnSecureToken : true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAqR2VZI-v8Zii7chqyseEncFKwcMOJC_o',postSignup)
            .then(response=>{
                this.setState({isSignedUp:true})
                this.props.history.push({pathname:'/signin',state:response.data})
                // console.log(response)
                // console.log(response.config,"conf")
                           
            })
            .catch(err=>{
                this.setState({isErr:true,error:err.response.data.error.message})
                console.log(err.response.data.error.message);
                })
    }

    switchAuthHandler = (val)=>{
        this.setState({isSignedUp:val})
        console.log(this.state.isSignedUp)
    }
    
    render(){
        let formElementArray=[];
        let isFormValid = true;
    for(let key in this.state.controls){
        formElementArray.push({
            id:key,
            config: this.state.controls[key],

        })
        isFormValid = this.state.controls[key].isValid && isFormValid;
        
    }
    console.log(isFormValid,'valid')
    
    let form = formElementArray.map(formElement=>(
        <Input elementType={formElement.config.elementType}
                label={formElement.config.label} 
                config={formElement.config.elementConfig}
                name ={formElement.id}
                key={formElement.id}
                touched ={formElement.config.touched}
                invalid={!formElement.config.isValid}
                inputChange={(event)=>this.inputChangeHandler(event,formElement.id)}
                />
                
    ));
    let buttons =(
        <div>
            <button disabled={!isFormValid} onClick={this.registerHandler}>REGISTER </button>
        </div>
    )
    
    let error = null;
    if (this.props.error){
        console.log(this.props.error)
        error=<p style={{color:'red',fontSize:'11px'}}>{this.props.error}</p>;    
    } 
       
        return(
            <div className='Auth'>
                {this.state.isErr?<p style={{color:'red',fontSize:'11px'}}>User Exists</p>:null}                    
                <form onSubmit={this.submitHandler}>
                    {form}
                    {buttons}
                    {error}
                   
                </form>
            </div>
        )
    }
}   
export default Register;
