// 封装获取频道列表的逻辑
import { getChannelAPI } from "@/apis/article";
import { useEffect, useState } from "react";

function useChannel() {
  // 获取频道列表
  const [channelList, setChannelList] = useState([]);

  useEffect(() => {
    // 1. 封装函数, 在函数体内接口调用
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.channels);
    };

    // 2. 调用函数
    getChannelList();
  }, []);

  return { channelList };
}

export { useChannel };
