Make list of every READ and WRITE situation,
breaking down which & how many objects need to be
read or updated in each situation.

Then try to trim them down as much as possible while
still accomplishing the funcitonality.

/api/destinations
list of all destinations 
"Destination"

{
  totalDiveSites
  destinations: [
    {
      id
      name
      diveSiteCount
      isTop
      urlThumbnail (500x500)
      regions: [
        {
          id
          name
          diveSiteCount
        }
      ]
    }
  ]
}

/api/destination/details/:id
details of one destination
"DestinationDetails"

{
  id
  name
  diveSiteCount
  isTop
  urlThumbnail (500x500)
  regions: [
    {
      id
      name
      recentPhotos: [  (10)
        {
          id
          urlThumbnail
        }
      ]
    }
  ]
  recentPhotos: [  (10)
    {
      id
      urlThumbnail
    }
  ]
}

/api/dive-sites/polygon or /api/dive-sites
list of dive sites within a polygon
"DiveSite"

[
  {
    id
    name
    country
    rating
    ratingCount
    urlThumbnail
    location: {
        type: point,
        coordinates: {
          
        }
      }
    visibility
    depth
    waterTemp
    currents
    access
    animals: [id, ...]
    destination: {
      id
      name
    }
    region: {
      id
      name
    }
  }
]

/api/dive-site/details/:id
full dive site object
"DiveSiteDetails"

{
  id
  name
  country
  urlThumbnail
  location: {
      type: point,
      coordinates: {
        
      }
    }
  visibility
  depth
  waterTemp
  currents
  access
  animals: [
    {
      id
      name
      urlThumbnail
      countSightings
    }
  ]
  destination: {
    id
    name
  }
  region: {
    id
    name
  }
  user: {
    id
    username
    profilePhotoURL
  }
  rating
  ratingCount
  reviews: [
    {
      score
      userID
      timestamp
      comment
    }
  ]
  photos: [
    {
      id
      url
      urlThumbnail
      timestamp
      user: {
        id
        name
      }
    }
  ]
}

/api/photos
list of all photos
"Photo"

[
  {
    id
    timestamp
    urlThumbnail
    countLikes
    countViews
    countComments
    animals: [id, ...]
    diveSite: {
      id
      name
    }
    destination: {
      id
      name
    }
    region: {
      id
      name
    }
  }
]

/api/photos/:id
get details for one photo
"PhotoDetails"

{
  id
  timestamp
  url
  urlThumbnail
  countLikes
  countViews
  countComments
  comments : [
    {
      timestamp
      comment
      user: {
        id
        username
        profilePhotoURL
      }
    }
  ]
  diveSite: {
    id
    name
  }
  destination: {
    id
    name
  }
  region: {
    id
    name
  }
  animals: [
    {
      id
      name
      urlThumbnail
    }
  ]
}


/api/user/:id
get one user's data
"User"

{
  id
  token
  username
  firstName
  lastName
  email
  profilePhotoURL
  photos: [

  ]
  loggedDives: [

  ]
  diveSites: [
    
  ]
}