import axios from "axios";
import { flow, Instance, types } from "mobx-state-tree";

import { getAccounts } from "src/api/users/accounts";
import { GetRandomUser, MasterAccounts } from "src/api/users/users.response";

export const UserStore = types.model("UserStore", {
  name: types.maybe(types.string),
  image: types.maybe(types.string),
  siren: types.maybe(types.number),
  fullAddress: types.maybe(types.string),
  accounts: types.maybe(types.frozen<MasterAccounts[]>()),
 
})
.actions((self)=> ({
  setUserName: (name: string)=>(self.name = name),
  setUserImage: (image: string)=>(self.image = image),
  setUserSiren: (siren: number)=>(self.siren = siren),
  setUserFullAddress: (fullAddress: string)=>(self.fullAddress = fullAddress),
  setUserAccounts: (accounts: MasterAccounts[])=>(self.accounts = accounts),
  fetchRandomUser: flow(function*(){
    return yield axios.get(
      `${process.env.REACT_APP_RANDOM_USERS_API}/?inc=name,picture`
    );

  }),
})).actions((self)=>({
   fetchSiren: flow(function*(){
     const sirenNumber = Number(process.env.REACT_APP_TEMP_SIREN)!;
     self.setUserSiren(sirenNumber);

    return yield axios.get(
      `${process.env.REACT_APP_SIREN_API}/unites_legales/${sirenNumber}`
    );

  }),
}))

.actions((self)=>({
  fetchUser: flow(function* () {
    const ramdonUser: GetRandomUser = yield self.fetchRandomUser();
    const user = ramdonUser.data.results[0];
    const userName = `${user.name.title} ${user.name.first} ${user.name.last}`;
    self.setUserName(userName);
    
    const userImage = `${user.picture.thumbnail}`;
    self.setUserImage(userImage);

    const sirenData = yield self.fetchSiren();
    const fullAddress: string = sirenData.data.unite_legale.etablissement_siege.geo_adresse;

    self.setUserFullAddress(fullAddress);

    const accounts:MasterAccounts[] =  yield getAccounts();
    self.setUserAccounts(accounts);
   
    return ramdonUser;
  })
}));
export const userStore = UserStore.create({});
export type UserStoreType = Instance<typeof UserStore>;
