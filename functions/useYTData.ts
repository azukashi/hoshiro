import { useChannelGetter, useChannelAbout } from './useChannel';
import { YTNodes } from 'youtubei.js';

export const useYTData = async (handle: string, useId?: boolean) => {
    let url = `https://youtube.com/${handle}`;
    if (useId) url = `https://youtube.com/channel/${handle}`;
    const data = await useChannelGetter(url);
    const about = await useChannelAbout(url);
    try {
        const datahead = data.header?.as(YTNodes.C4TabbedHeader);
        const abouthead = about?.as(YTNodes.AboutChannel);
        const filterred = {
            picture: data?.metadata.avatar,
            banner: datahead?.banner,
            subscribers: datahead?.subscribers?.text,
            videos: datahead?.videos_count?.text,
            is_verified: datahead?.author.is_verified,
            is_membership: !datahead?.sponsor_button?.is_disabled,
        };
        const filterredAbout = {
            views_count: abouthead.metadata?.view_count,
            joined_date: abouthead.metadata?.joined_date?.text,
            country: abouthead.metadata?.country,
            description: abouthead.metadata?.description,
            links: abouthead.metadata?.links,
        };

        return { ...filterred, ...filterredAbout };
    } catch (err) {
        console.log(err);
    }
};
