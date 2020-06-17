/api/destinations
list of all destinations 
"Destination"

[
  {
    id
    name
    diveSiteCount
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

/api/destination/details/:id
details of one destination
"DestinationDetails"

{
  id
  name
  regions: [
    {
      id
      name
    }
  ]
  recentPhotos: [  (10)
    {
      id
      urlThumbnail
      rating
      user: {
        id
        name
      }
    }
  ]
}

/api/dive-sites
list of all dive sites
"DiveSite"

[
  {
    id
    name
    location: {
        type: point,
        coordinates: {
          
        }
      }
    destination: {
      id
      name
    }
    region: {
      id
      name
    }
    urlThumbnail
    rating
    ratingCount
  }
]

/api/dive-sites/polygon
list of dive sites within a polygon
"DiveSite"

[
  {
    id
    name
    location: {
        type: point,
        coordinates: {
          
        }
      }
    destination: {
      id
      name
    }
    region: {
      id
      name
    }
    urlThumbnail
    rating
    ratingCount
  }
]

/api/dive-site/details/:id
full dive site object
"DiveSiteDetails"

{
  id
  name
  location: {
        type: point,
        coordinates: {
          
        }
      }
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
  score
  ratings: [
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
    name
    urlThumbnail
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
      }
    ]
    rating
    ratingCount
  }
]

/api/photos/:id
get details for one photo
"PhotoDetails"

{
  id
  userID
  name
  url
  urlThumbnail
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
    }
  ]
  score
  ratings: [
    {
      score
      timestamp
      comment
      user: {
        id
        username
        profilePhotoURL
      }
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
}