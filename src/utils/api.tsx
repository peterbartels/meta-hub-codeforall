/* Api methods to call /functions */

const create = (data: any) => {
  return fetch('/.netlify/functions/graphql', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const readAll = () => {
  return fetch('/.netlify/functions/profiles-read-all').then((response) => {
    return response.json()
  })
}

const update = (profileId: any, data: any) => {
  return fetch(`/.netlify/functions/profiles-update/${profileId}`, {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const deleteProfile = (profileId: any) => {
  return fetch(`/.netlify/functions/profiles-delete/${profileId}`, {
    method: 'POST',
  }).then(response => {
    return response.json()
  })
}

const batchDeleteProfile = (profileIds: any) => {
  return fetch(`/.netlify/functions/profiles-delete-batch`, {
    body: JSON.stringify({
      ids: profileIds
    }),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

export default {
  create: create,
  readAll: readAll,
  update: update,
  delete: deleteProfile,
  batchDelete: batchDeleteProfile
}
