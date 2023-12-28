import { SearchKeywordModel, UserHistoryModel, UserModel } from "../models";
import { currentDate } from "../utils";
import { getSearchKeyData, upsertSearchTrack } from "./search.service";

const upsertUser = async (ipAddress: string): Promise<any> => {
  const filter = { ipAddress };

  const update = {
    ipAddress,
  };

  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await UserModel.findOneAndUpdate(filter, update, options);

    console.log(`Upserted user ${result}`);
    return result;
  } catch (error) {
    console.error("Error upsertUser:", error);
    throw error;
  }
};

const updateUserHistory = async (
  ipaddress: string,
  keyword: string
): Promise<any> => {
  try {
    const _user = await upsertUser(ipaddress);

    const filter = {
      user: _user?._id,
      date: currentDate,
    };

    const userHistory = await UserHistoryModel.findOne(filter);

    const _keyword = await getSearchKeyData(keyword);

    if (userHistory) {
      if (_keyword) {
        await UserHistoryModel.updateOne(
          { user: _user?._id },
          { $addToSet: { keywords: _keyword?._id } }
        );
      }
    } else {
      if (_keyword) {
        await UserHistoryModel.create({
          user: _user?._id,
          date: currentDate,
          keywords: [_keyword?._id.toString()],
        });
      }
    }

    if (keyword) {
      await upsertSearchTrack(_user?.id, _keyword?._id);
    }
  } catch (error) {
    console.error("Error updateUserHistory:", error);
    throw error;
  }
};

export { upsertUser, updateUserHistory };
