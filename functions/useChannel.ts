import { Innertube } from 'youtubei.js';

// @ts-ignore
export const useChannelGetter = async (url: string) => {
    const innerTube = await Innertube.create();
    const resolved = await innerTube.resolveURL(url);
    const channelId = await resolved.payload.browseId;
    const channel = await innerTube.getChannel(channelId);
    const about = await channel.getAbout();
    return { channel, about };
};
