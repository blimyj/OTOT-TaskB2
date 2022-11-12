// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {
  Box,
  Button,
  ButtonBase,
  // Container,
  Card,
  CardContent,
  TextField,
  Typography
} from "@mui/material";
import {useState, useEffect} from 'react';
const myApi = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
});

function App() {

  const [contacts, setContacts] = useState([]);
  
  const [nameValue, setNameValue] = useState("");
  const onNameChange = (e) => setNameValue(e.target.value);

  const [emailValue, setEmailValue] = useState("");
  const onEmailChange = (e) => setEmailValue(e.target.value);

  const [idValue, setIdValue ] = useState(null);
  // const [genderValue, setGenderValue] = useState("");
  // const onGenderChange = (e) => setGenderValue(e.target.value);
  
  // const [phoneValue, setPhoneValue] = useState("");
  // const onPhoneChange = (e) => setPhoneValue(e.target.value);
  
  const handleSubmit = async () => {
        const params = new URLSearchParams();
        params.append("name",  nameValue);
        params.append("email", emailValue);
        await myApi.post('/contacts', params)
        getAllContacts();
  }

  const handleUpdate = async () => {
      const params = new URLSearchParams();
      params.append("name", nameValue);
      params.append("email", emailValue);
      await myApi.put('/contacts/' + idValue, params)
      getAllContacts();
  }

  const handleReset = () => {
    setIdValue(null)
    setNameValue('')
    setEmailValue('')
  }

  const getAllContacts = async() => {
    await myApi.get('/contacts').then(res => {
      console.log(res)
      console.log(res.data.data)
      setContacts(res.data.data)}
    )
  }

  const deleteContact = async(_id) => {
    await myApi.delete('/contacts/' + _id)
    getAllContacts();
  }


  useEffect(()=> {
    console.log('Here')
    getAllContacts();
  }, [])

  

  console.log('Here')

  

  return (
    <div className="App">
      <Typography>Contacts</Typography>
      <div style={{width: '100%',
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'center', 
      }}>
        <Box style={{width: '40%',
          display: 'flex',
          justifyContent: 'center', 
          flexDirection: 'column'
        }}>
          <Card>
            <CardContent>
              <div>
                <div>
                  {idValue ? 'Updating contact: ' + idValue + '\nClick reset to clear form' : 'Choose a contact to edit, or type something here to create a new contact'}
                </div>
                <TextField
                  onChange={onNameChange}
                  value={nameValue}
                  label={"Name"} //optional
                  sx={{
                    margin: '4px'
                  }}
                />

                <TextField
                  onChange={onEmailChange}
                  value={emailValue}
                  label={"Email Value"} //optional
                  sx={{
                    margin: '4px'
                  }}
                />
              </div>
              <Button onClick={idValue ? handleUpdate : handleSubmit}>Submit</Button>
              <Button onClick={handleReset}>Reset</Button>
            </CardContent>
          </Card>
        </Box>
        <div style={{width: '50%',
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          {contacts.map((contact) => {
              return (
                <Card key={contact._id}
                  sx={{
                    width: '70%',
                    backgroundColor: 'hsla(213, 90%, 60%, 1);',
                    display: 'flex',
                    justifyContent: 'flex-start',
                  }}
                >
                  <ButtonBase
                      onClick={(event) => {
                        setIdValue(contact._id)
                        setNameValue(contact.name)
                        setEmailValue(contact.email)
                      }}
                      sx={{width: '100%'}}
                  >
                    <div style={{width: '100%'}}>
                      <h5>
                          {"Name: " + contact.name }
                      </h5>
                      <h5>
                          {"Email: " + contact.email}
                      </h5>
                    </div>
                  </ButtonBase>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary" onClick={() => deleteContact(contact._id)}
                    
                  >
                    Delete
                  </Button>
                </Card>
              )
              })
          }
          </div>
      </div>
    </div>
  );
}

export default App;
