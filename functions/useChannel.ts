import { Innertube } from 'youtubei.js';

// @ts-ignore
export const useChannelGetter = async (url: string) => {
    const innerTube = await Innertube.create();
    const resolved = await innerTube.resolveURL(url);
    const channelId = await resolved.payload.browseId;
    return await innerTube.getChannel(channelId);
};

export const useChannelAbout = async (url: string) => {
    const innerTube = await Innertube.create();
    const resolved = await innerTube.resolveURL(url);
    const channelId = await resolved.payload.browseId;
    return (await innerTube.getChannel(channelId)).getAbout();
};
