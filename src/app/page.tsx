import { Input, TextArea } from '../components/inputs/inputs'

const Home=()=>{
  return (
    <main >  
      <Input type={'text'}>nome</Input>
      <TextArea>bora</TextArea>
      <select name="teste" id="teste">
        <option id='teste' value="oi">oi</option>
        <option id='teste' value="tchau">tchau</option>
      </select>
    </main>
  )
}


export default Home