import React, {Component} from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import qs from 'qs';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        data: []
    };
  }

  componentDidMount() {
    this.fetchDiveSite()
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      console.log("fetch")
      this.fetchDiveSite()
    }
  }


  fetchDiveSite = () => {
    fetch('http://localhost:8080/api/dive-sites/details/'+`${qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        this.setState({ data: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
    })
  }
  

  render() {
    const {diveSite} = this.state.data

    if (this.state.isLoading) {
      return <Loading />
    } else {
      return (
        <View style={{position: 'absolute', width: '100%', height: '100%', padding: 20, backgroundColor: '#FEFEFE', borderLeftWidth: 1, borderColor: "#DDDDDD"}}>
        {!diveSite.details || !diveSite.details.description ? <View></View> :
          <Text style={{fontSize: 18, marginTop: 20}}>{diveSite.details.description}</Text>
        }
        <View style={{marginTop: 20}}>
          {!diveSite.details || !diveSite.details.depth ? <View></View> :
            <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Depth</Text>
              <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.depth}</Text>
            </View>
          }
          {!diveSite.details || !diveSite.details.access ? <View></View> :
            <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Access</Text>
              <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.access}</Text>
            </View>
          }
          {!diveSite.details || !diveSite.details.visibility ? <View></View> :
            <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Visibility</Text>
              <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.visibility}</Text>
            </View>
          }
          {!diveSite.details || !diveSite.details.currents ? <View></View> :
            <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Currents</Text>
              <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.currents}</Text>
            </View>
          }
          {!diveSite.details || !diveSite.details.airTemperature ? <View></View> :
            <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Air Temperature</Text>
              <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.airTemperature}</Text>
            </View>
          }
          {!diveSite.details || !diveSite.details.waterTemperature ? <View></View> :
            <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Water Temperature</Text>
              <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.waterTemperature}</Text>
            </View>
          }
          {!diveSite.details || !diveSite.details.experienceLevel ? <View></View> :
            <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Experience Level</Text>
              <Text style={{fontSize: 16, color: 'black'}}>{diveSite.details.experienceLevel}</Text>
            </View>
          }

          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
            <Image style={{height: 20, width: 20, margin: 10, marginRight: 5, marginTop: 20, tintColor: '#A00000'}} source={require('../assets/create.svg')} />
            <Text style={{color: '#A00000', fontWeight: 'bold', marginTop: 8, marginRight: 5}}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      )
    }
  }
}

function Loading() {
 return (
  <View style={{position: 'absolute', width: '100%', height: '100%', padding: 20, backgroundColor: '#FEFEFE', borderLeftWidth: 1, borderColor: "#DDDDDD"}}>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
    </View>
  </View>
  )
}

export default Result