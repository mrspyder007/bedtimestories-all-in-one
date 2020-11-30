import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, ToastAndroid} from 'react-native';
import { Header } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';

import db from '../config'
import firebase from 'firebase';

export default class WriteStoryScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            title: '',
            author: '',
            story: ''
        }
    }

    submitStory =()=>{
        db.collection("users").add({
          'title': this.state.title,
          'author': this.state.author,
          'story': this.state.story,
          'date':firebase.firestore.Timestamp.now().toDate(),
        })
       // ToastAndroid.show("Story submitted successfully",ToastAndroid.SHORT);
    }

   render(){
       return(
           <ScrollView>
                <KeyboardAvoidingView behavior = "padding" enabled>
                        <Header
                            backgroundColor= {'#3ec1d3'}
                            centerComponent= {{
                                text: 'Bedtime Stories',
                                style: { color: '#f6f7d7', fontSize: 20, fontWeight: 'bold' },
                            }}
                        />

                        <View style= {styles.container}>
                            <View style={styles.inputView}>
                                <TextInput 
                                    style= {styles.inputBox} 
                                    placeholder= "Story Title"
                                    onChangeText={text => {
                                        this.setState({ title: text });
                                    }}
                                    value={this.state.title}
                                />
                            </View>
                        
                            <View style={styles.inputView}>
                                <TextInput 
                                    style= {styles.inputBox} 
                                    placeholder= "Author"
                                    onChangeText={text => {
                                        this.setState({ author: text });
                                    }}
                                    value={this.state.author}
                                />
                            </View>
                        
                            <View style={styles.inputView}>
                                <TextInput 
                                    style= {[styles.storyInputBox,{textAlignVertical: "center"}]} 
                                    placeholder= "Write your story" 
                                    multiline= {true}
                                    onChangeText={text => {
                                        this.setState({ story: text });
                                    }}
                                    value={this.state.story}
                                /> 
                            </View> 

                            <View style={styles.inputView}>
                                <TouchableOpacity 
                                    style= {styles.button} 
                                    onPress={this.submitStory}
                                >
                                    <Text style= {styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                </KeyboardAvoidingView>
           </ScrollView>
       )
   }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        color: '#ff9a00',
        fontWeight: 'bold'
    },
    inputView:{
        flexDirection: 'row',
        margin: 10
    },
    inputBox:{
        marginTop: 30,
        width: 300,
        height: 40,
        borderWidth: 1,
        fontSize: 20
    },
    storyInputBox:{
        marginTop: 30,
        width: 300,
        height: 200,
        borderWidth: 1,
        fontSize: 20
    },
    button:{
        backgroundColor: '#ff165d',
        width: 100,
        height: 40,
        borderWidth: 1.5,
        marginTop: 70
    }
});
