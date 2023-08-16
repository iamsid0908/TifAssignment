import userModels from "../src/models/user.models";
import roleModels from "../src/models/role.models";
import CommunityModels from "../src/models/community.models";

export async function getUserInfo(userId:any) {
    const user = await userModels.findOne({ _id: userId });
    return {
      id: user?._id.toString(),
      name: user?.name
    };
  }

  
export async function getRoleInfo(roleId:any) {
    const role = await roleModels.findOne({ _id: roleId });
    return {
      id: role?._id.toString(),
      name: role?.name
    };
  }
  
  export async function getCommunityInfo(communityId:any) {
    const community = await CommunityModels.findOne({_id:communityId});
    return {
        id: community?.id.toString(),
        name: community?.name,
        slug: community?.slug
    }
  }