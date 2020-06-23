import React, {Component} from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { StickyContainer, Sticky } from 'react-sticky';

class Animals extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{width: 500}}>
          <LeadersHeader />
          <LeadersResults />
        </View>
        <StickyContainer style={{flex: 1}}>
          <Sticky>
            {({ style
             }) => (
              <View style={style}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <View style={{marginTop: 100, marginBottom: 100, padding: 50, maxWidth: 500, borderColor: '#CCCCCC', borderWidth: 1, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000'}}>
                    <Text style={{fontSize: 20, textAlign: 'center'}}>DivingCollective is community driven, and couldn't exist without users like you.</Text>
                    
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                      <View style={{flex: 1, margin: 10, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000', backgroundColor: 'red', paddingVertical: 20}}>
                        <Text style={{textAlign: 'center', color: 'white'}}>Add Photo</Text>
                      </View>
                      <View style={{flex: 1, margin: 10, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000', backgroundColor: 'red', paddingVertical: 20}}>
                        <Text style={{textAlign: 'center', color: 'white'}}>Log Dive</Text>
                      </View>
                      <View style={{flex: 1, margin: 10, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 5, shadowColor: '#000', backgroundColor: 'red', paddingVertical: 20}}>
                        <Text style={{textAlign: 'center', color: 'white'}}>Add Dive Site</Text>
                      </View>
                    </View>

                    <View style={{flexDirection: 'row', marginHorizontal: 10, paddingBottom: 20}}>
                      <BootyBadge amount={5} />
                      <BootyBadge amount={5} />
                      <BootyBadge amount={10} />
                    </View>
                  </View>
                </View>
              </View>
            )}
          </Sticky>
        </StickyContainer>
      </View>
    )
  }
}

function BootyBadge({ amount }) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
      <Text style={{fontWeight: '600', fontSize: 14}}>+ {amount} </Text>
      <Image style={{height: 15, width: 15}} source={require('../../assets/coin.png')} />
    </View>
  )
}

function LeadersResults() {
  return (
    <ScrollView>
      <LeaderCell rank={1} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={2} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={3} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={4} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={5} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={6} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={7} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={8} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={9} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={10} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={11} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={12} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={13} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={14} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={15} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={16} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={17} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={18} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={19} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={20} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={21} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={22} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={23} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={24} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={25} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={26} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={27} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={28} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={29} username={'Rob'} booty={'2,400'} country={"USA"} />
      <LeaderCell rank={30} username={'Rob'} booty={'2,400'} country={"USA"} />
    </ScrollView>
  )
}

function LeaderCell({ rank, username, booty, country}) {
  return (
    <View style={{backgroundColor: '#FEFEFE'}}>
      <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#CCCCCC'}}>
        <View style={{width: 60, paddingVertical: 7, justifyContent: 'center', borderRightColor: '#CCCCCC', borderRightWidth: 1}}>
          <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '600'}}>{rank}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center',  borderRightColor: '#CCCCCC', borderRightWidth: 1}}>
          <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '600'}}>{username}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  borderRightColor: '#CCCCCC', borderRightWidth: 1}}>
         <Text style={{textAlign: 'center', fontSize: 16,}}>{booty}</Text>
        </View>
        <View style={{width: 60, justifyContent: 'center', borderRightColor: '#CCCCCC', borderRightWidth: 1}}>
          <Text style={{textAlign: 'center', fontSize: 30}}>🇺🇸</Text>
        </View>
      </View>
    </View>
  )
}

function LeadersHeader() {
  return (
    <View>
      <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#CCCCCC'}}>
        <View style={{width: 60, paddingVertical: 10, justifyContent: 'center', borderRightColor: '#CCCCCC', borderRightWidth: 1}}>
          <Text style={{textAlign: 'center'}}>Rank</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center',  borderRightColor: '#CCCCCC', borderRightWidth: 1}}>
          <Text style={{textAlign: 'center'}}>User</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  borderRightColor: '#CCCCCC', borderRightWidth: 1}}>
          <Image style={{height: 25, width: 25}} source={require('../../assets/coin.png')} />
        </View>
        <View style={{width: 60, justifyContent: 'center', borderRightColor: '#CCCCCC', borderRightWidth: 1}}>
          <Text style={{textAlign: 'center'}}>Country</Text>
        </View>
      </View>
    </View>
  )
}

export default Animals;