import { useChannelGetter } from './useChannelGetter';
import { YTNodes } from 'youtubei.js';

// @ts-ignore
export const useYouTubeData = async (handle: string, useId?: bool) => {
    let url = `https://youtube.com/${handle}`;
    if (useId) url = `https://youtube.com/channel/${handle}`;
    const data = await useChannelGetter(url);
    const header = data.header?.as(YTNodes.C4TabbedHeader);
    const filterred = {
        picture: data.metadata.avatar,
        banner: header?.banner,
        subscribers: header?.subscribers?.text,
        videos: header?.videos_count?.text,
        is_verified: header?.author.is_verified,
        is_membership: !header?.sponsor_button?.is_disabled,
    };
    return filterred;
};
