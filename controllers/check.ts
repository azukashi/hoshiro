import { useChannelGetter } from '../functions/useChannel';
import { NextFunction, Response, Request } from 'express';
import { YTNodes } from 'youtubei.js';

export async function check(req: Request, res: Response, next: NextFunction) {
    const { link } = req.query;
    if (!link) return res.send(401).send({ message: 'Please include a YouTube link to check!' });

    try {
        if ((link as string).startsWith('https://')) {
            const ch = await useChannelGetter(link as string);
            const tabbed = ch.header?.as(YTNodes.C4TabbedHeader);

            res.status(200).send({
                name: tabbed?.author.name,
                picture: (ch?.metadata.avatar as any)[0],
                subscribers: tabbed?.subscribers?.text,
                handle: tabbed?.channel_handle?.text?.toLowerCase(),
            });
        } else {
            const parsed = `https://youtube.com/${link}`;
            const ch = await useChannelGetter(parsed);
            const tabbed = ch.header?.as(YTNodes.C4TabbedHeader);

            res.status(200).send({
                name: tabbed?.author.name,
                picture: (ch?.metadata.avatar as any)[0],
                subscribers: tabbed?.subscribers?.text,
                handle: tabbed?.channel_handle?.text?.toLowerCase(),
            });
        }
    } catch (err) {
        res.status(500).send({ message: 'Unexpected error' });
        console.log(err);
    }
}
