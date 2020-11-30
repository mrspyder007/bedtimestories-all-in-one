import React from 'react';
import { Text, View, FlatList} from 'react-native';
import {SearchBar, Header} from 'react-native-elements';
import db from '../config'

export default class ReadStoryScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          allStories:[],
          dataSource:[],
          search : ''
        }
    }


    retrieveStories=()=>{
      try{
        var allStories= []
        var stories = db.collection("stories").get().then((querySnapshot)=>{
          querySnapshot.forEach((doc)=>{
            allStories.push(doc.data())
          })
          this.setState({allStories})
        })
      }

      catch (error){
        console.log(error);
      }
    }
    
    componentDidMount=()=>{
        this.retrieveStories();
    }

    updateSearch=(search)=>{
        this.setState({search});
    }

    SearchFilterFunction=(text)=>{
        const newData = this.state.allStories.filter((item)=> {
          const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          dataSource: newData,
          search: text,
        });
    }

    render(){
        return(
            <View style= {{flex:1,justifyContent:'center',alignItems:'center'}}>
               <Header
                    backgroundColor= {'#3ec1d3'}
                    centerComponent= {{
                        text: 'Bedtime Stories',
                        style: { color: '#f6f7d7', fontSize: 20, fontWeight: 'bold', width: 1500, textAlign:'center'},
                    }}
                />

                <SearchBar
                    placeholder="search book here..."
                    onChangeText={text => this.SearchFilterFunction(text)}
                    value={this.state.search}
                />

                <FlatList
                  data = {this.state.search === "" ?  this.state.allStories: this.state.dataSource}
                  renderItem = {({ item }) => (
                    <View style={{borderColor:'#ff165d',borderWidth:2,padding:10,alignItems:'center',margin:30,backgroundColor:'yellow'}}>
                      <Text style={{color:'#ff165d', fontWeight:'bold'}}>Title: {item.title}</Text>
                      <Text style={{color:'#ff165d', fontWeight:'bold'}}>Author : {item.author}</Text>
                    </View>
                  )}
                  keyExtractor = {(item, index) => index.toString()}
                />  
            </View>
        )
    }
}