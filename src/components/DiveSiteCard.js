import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Stars from './Stars';

function DiveSiteCard({ site, selected, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={1.0}>
            <View style={{margin: 5, marginBottom: 0, padding: 20, backgroundColor: '#FEFEFE', shadowColor: '#000',
                borderColor: "#A00000",
                borderRadius: 3,
                // borderWidth: selected ? 2 : 0,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.3,
                shadowRadius: 5}}>
                {selected ? <DiveSiteCardExpanded site={site} /> : <DiveSiteCardCollapsed site={site} />}
            </View>
        </TouchableOpacity>   
    )
}

function DiveSiteCardCollapsed({ site }) {
    return (
        <View>
            <View style={{flexDirection: 'row'}}>
                <View>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{site.name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 5}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{site.country}, </Text>
                        <Text style={{fontSize: 16}}>{ Number((site.location.coordinates[1]).toFixed(5))}, {Number((site.location.coordinates[0]).toFixed(5))}</Text>
                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        <Stars rating={site.score} />
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {site.rating ? <Text style={{color: '#000000', fontSize: 16, fontWeight: 'bold'}}>{(Math.round(site.rating * 100) / 100).toFixed(2)}</Text> : <View />}
                            <Text style={{marginLeft: 5}}>(0 reviews)</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

function DiveSiteCardExpanded({ site }) {
    return (
        <View>
            <DiveSiteCardCollapsed site={site} />
            
            {!site.description ? <View></View> : 
                <Text style={{fontSize: 18, marginTop: 20}}>{site.description}</Text>
            }

            <View style={{marginTop: 20}}>
                {!site.depth ? <View></View> : 
                    <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Depth</Text>
                        <Text style={{fontSize: 16, color: 'black'}}>{site.depth}</Text>
                    </View>
                }
                {!site.visibility ? <View></View> : 
                    <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Visibility</Text>
                        <Text style={{fontSize: 16, color: 'black'}}>{site.visibility}</Text>
                    </View>
                }
                {!site.access ? <View></View> : 
                    <View style={{padding: 7, borderBottomWidth: 1, borderColor: '#cccccc', backgroundColor: '#EEEEEE', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Access</Text>
                        <Text style={{fontSize: 16, color: 'black'}}>{site.access}</Text>
                    </View>
                }
            </View>
        </View>
    )
}

export default DiveSiteCard;