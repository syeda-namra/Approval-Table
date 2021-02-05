import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Button, ScrollView} from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import  axios from 'axios';
 
export default class ExampleFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      organization:[]

    }
  }
 
 

  componentDidMount() {
    axios.get('https://wooback.herokuapp.com/api/user/getallusers')
      .then(res => {
        //console.log(res.data)
        const organization = res.data;
        this.setState({
          organization
        } );
        console.log(this.state.organization)
      })
      .catch(err=>{
        console.log(err)
      })
      

  }
    
  click(e) {
    axios.put(`https://wooback.herokuapp.com/api/user/${e}/edituser`,{verified:true})
        .then((response) => {
             console.log(response)
             Alert.alert(`Verified user`);
         })
        .catch((err) => {

            console.log(err)
         });
}
_alertIndex1(e) {
  axios.put(`https://wooback.herokuapp.com/api/user/${e}/edituser`,{verified:false})
      .then((response) => {
           console.log(response)
           Alert.alert(`Not a verified user`);
       })
      .catch((err) => {

          console.log(err)
       });
}
  render() {
  
    return (
      
      <View style={styles.container}>
              
              <Text style={styles.head}> Organization ID        Full Name     Department      Conatct Number        Verified</Text>  
        
        {this.state.organization.map((org)=>
          <ScrollView horizontal={true}> 
          
           <Text>
            {org.OrganizationDetail.organization_id}         {org.OrganizationDetail.fullName}          {org.OrganizationDetail.department}           {org.OrganizationDetail.contact_number}         {String(org.verified)}      
            {"\t"} {"\t"}
        <Button
        onPress={() => this.click(org._id)}
         title = "Approved"
         color = "green"
      />
    {"\t"}
      <Button
        onPress={() => this._alertIndex1(org._id)}
         title = "Declined"
         color = "red"
      /> 
{"\n"}
            </Text>
      
            </ScrollView>)
           
           }
   
   
   </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: '25%',paddingLeft :40, backgroundColor: '#fff', alignContent: 'center' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 10, color: '#007AFF'},
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 0, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2, textAlign:'center'},
  
});