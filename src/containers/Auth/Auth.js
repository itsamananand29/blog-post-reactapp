import axios from 'axios';
import React,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import './Auth.css';
class Auth extends Component{
    state ={
        controls:{
            
            email:{
                elementType:'input',
                value:'',
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
        },
        isSignedUp:true,
        isErr:false,
        error:null
    }
    componentDidMount(){
        // console.log(this.props)
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
            isValid = pattern.test(value) && isValid
        }
        if (validation.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
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
    registerHandler=()=>{
        this.props.history.push({pathname:'/signin/register'})
    }
    checkExpirationtime=(expirationTime)=>{
        setTimeout(()=>{
            localStorage.removeItem('token')
            localStorage.removeItem('userId');
            localStorage.removeItem('expiresIn');
            this.props.history.push({pathname:'/'})
        },expirationTime*100)
    }
    submitHandler=(event)=>{
        event.preventDefault();
        const authData={
            email:this.state.controls.email.value,
            password:this.state.controls.password.value,
            returnSecureToken:true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAqR2VZI-v8Zii7chqyseEncFKwcMOJC_o',authData)
            .then(response=>{
                // console.log("signin",response.data);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
                localStorage.setItem('token',response.data.idToken)
                localStorage.setItem('userId',response.data.localId)
                localStorage.setItem('expiresIn',expirationDate)
                this.checkExpirationtime(response.data.expiresIn)
                // this.props.history.push({pathname:'/',state:true})
                this.props.history.goBack();
            })
            .catch(err=>{
                this.setState({isErr:true,error:err.response.data.error.message})
                // console.log(err.response.data.error)
            })

    }

    
    switchAuthHandler = (val)=>{
        this.setState({isSignedUp:val})
        // console.log(this.state.isSignedUp)
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
    //console.log(isFormValid,'valid')
    
    let form = formElementArray.map(formElement=>(
        <Input elementType={formElement.config.elementType} 
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
            <button disabled ={!isFormValid} onClick={()=>this.switchAuthHandler(true)}>SIGN IN</button>
            <button  onClick={this.registerHandler}>SIGN UP </button>
        </div>
    )
    
    let error = null;
    if (this.props.error){
        console.log(this.props.error)
        error=<p style={{color:'red',fontSize:'11px'}}>{this.props.error}</p>;    
    } 
    // let authRedirect = null;
    // if(this.props.isAuthenticated){
    //     authRedirect=<Redirect to ={this.props.authRedirectPath} />
    // }      
        return(
            <div className='Auth'>
                    {/* {authRedirect} */}
        {this.state.isErr?<p style={{color:'red',fontSize:'11px'}}>{this.state.error}</p>:null}    
                <form onSubmit={this.submitHandler}>
                    {form}
                    {buttons}
                    {error}
                   
                </form>
            </div>
        )
    }
}   
export default Auth;
