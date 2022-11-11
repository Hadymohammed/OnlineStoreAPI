import UserModel,{User} from '../../models/user.model'

const userEntity=new UserModel;

describe("User Model testing suit",()=>{

    it("Should have an index method",() => {
        expect(userEntity.index).toBeDefined();
    })
    it("Should have an getById method",() => {
        expect(userEntity.getById).toBeDefined();
    })
    it("Should have an deleteById method",() => {
        expect(userEntity.deleteById).toBeDefined();
    })
    it("Should have an create method",() => {
        expect(userEntity.create).toBeDefined();
    })
    it("Should have an update method",() => {
        expect(userEntity.update).toBeDefined();
    })

    it("Should create user",async () => {
        const result = await userEntity.create({
            first_name: 'Ahmed',
            last_name: 'Mohamed',
            password:'123123'
          });
        expect(result).toEqual({
            id:2,
            first_name: 'Ahmed',
            last_name: 'Mohamed',
        });
    })
    it("Shold gets user from getById()",async()=>{
        const result = await userEntity.getById(2);
        expect(result).toEqual({
            id:2,
            first_name: 'Ahmed',
            last_name: 'Mohamed',
            password:'123123'
        });
    })
    it("Should updates user",async () => {
        const result = await userEntity.update({
            id:2,
            first_name: 'Ahmed',
            last_name: 'Update',
            password:'123123'
          });
        expect(result).toEqual({
            id:2,
            first_name: 'Ahmed',
            last_name: 'Update',
        });
    })
    it("Should deletes user",async () => {
        const result = await userEntity.deleteById(2);
        expect(result).toEqual({
            id:2,
            first_name: 'Ahmed',
            last_name: 'Update',
            password:'123123'
        });
    })
    
})