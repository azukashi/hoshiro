import { useChannelGetter } from './useChannel';
import { YTNodes } from 'youtubei.js';

export const useYTData = async (handle: string, useId?: boolean) => {
    let url = `https://youtube.com/${handle}`;
    if (useId) url = `https://youtube.com/channel/${handle}`;
    const { channel, about } = await useChannelGetter(url);
    try {
        if (channel.header?.is(YTNodes.C4TabbedHeader)) {
            const abouthead = about?.as(YTNodes.AboutChannel);
            const filterred = {
                picture: channel?.metadata.avatar,
                banner: channel?.header?.banner,
                subscribers: channel?.header?.subscribers?.text,
                videos: channel?.header?.videos_count?.text,
                is_verified: channel?.header?.author.is_verified,
                is_membership: !channel?.header?.sponsor_button?.is_disabled,
            };
            const filterredAbout = {
                views_count: abouthead.metadata?.view_count,
                joined_date: abouthead.metadata?.joined_date?.text,
                country: abouthead.metadata?.country,
                description: abouthead.metadata?.description,
                links: abouthead.metadata?.links,
            };

            return { ...filterred, ...filterredAbout };
        } else {
            console.log('Not C4TabbedHeader');
        }
        // const datahead = data.header?.as(YTNodes.C4TabbedHeader);
        // const abouthead = about?.as(YTNodes.AboutChannel);
        // const filterred = {
        //     picture: data?.metadata.avatar,
        //     banner: datahead?.banner,
        //     subscribers: datahead?.subscribers?.text,
        //     videos: datahead?.videos_count?.text,
        //     is_verified: datahead?.author.is_verified,
        //     is_membership: !datahead?.sponsor_button?.is_disabled,
        // };
        // const filterredAbout = {
        //     views_count: abouthead.metadata?.view_count,
        //     joined_date: abouthead.metadata?.joined_date?.text,
        //     country: abouthead.metadata?.country,
        //     description: abouthead.metadata?.description,
        //     links: abouthead.metadata?.links,
        // };

        // return { ...filterred, ...filterredAbout };
    } catch (err) {
        console.log(err);
    }
};

export const getPicture = async (handle: string, name: string) => {
    try {
        let url = `https://youtube.com/${handle}`;
        const data = await useChannelGetter(url);

        // @ts-ignore
        return data.metadata.avatar[0].url;
    } catch (err) {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;
    }
};
