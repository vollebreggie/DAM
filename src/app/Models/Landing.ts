export class Landing {

    constructor(id: number = 0, firstName: string = "", secondName: string = "", firstTitle: string = "", secondTitle: string = "", profileProfile: string ="") {
        this.id = id;
        this.firstName = firstName;
        this.secondName = secondName;
        this.firstTitle = firstTitle;
        this.secondTitle = secondTitle;
        this.profilePicture = profileProfile;
    }

    id: number;
    firstName: string;
    secondName: string;
    firstTitle: string;
    secondTitle: string;
    profilePicture: string;
}