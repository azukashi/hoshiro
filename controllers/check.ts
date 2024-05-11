// @ts-nocheck
import { useChannelGetter } from '../functions/useChannel';
import { NextFunction, Response, Request } from 'express';
import { YTNodes } from 'youtubei.js';

export async function check(req: Request, res: Response, next: NextFunction) {
    const { link } = req.query;
    if (!link) return res.send(422).send({ status: 422, message: 'Please include a YouTube link to check!' });

    try {
        if ((link as string).startsWith('https://')) {
            const { channel: ch } = await useChannelGetter(link as string);
            if (ch.header?.is(YTNodes.C4TabbedHeader)) {
                res.status(200).send({
                    name: ch?.header.author.name,
                    picture: (ch?.metadata.avatar as any)[0],
                    subscribers: ch?.header.subscribers?.text,
                    handle: ch?.header.channel_handle?.text?.toLowerCase(),
                    type: 'C4TabbedHeader',
                });
            } else if (ch.header?.is(YTNodes.PageHeader)) {
                res.status(200).send({
                    name: ch.header.content?.title?.text.text,
                    picture: (ch.metadata.avatar as any)[0],
                    subscribers: ch?.header?.content?.metadata?.metadata_rows[1]?.metadata_parts[0].text.text,
                    handle: ch?.header?.content?.metadata?.metadata_rows[0]?.metadata_parts[0].text.text?.toLowerCase(),
                    type: 'PageHeader',
                });
            }
        } else {
            const parsed = `https://youtube.com/${link}`;
            const { channel: ch } = await useChannelGetter(parsed);

            if (ch.header?.is(YTNodes.C4TabbedHeader)) {
                res.status(200).send({
                    name: ch?.header.author.name,
                    picture: (ch?.metadata.avatar as any)[0],
                    subscribers: ch?.header.subscribers?.text,
                    handle: ch?.header.channel_handle?.text?.toLowerCase(),
                    type: 'C4TabbedHeader',
                });
            } else if (ch.header?.is(YTNodes.PageHeader)) {
                res.status(200).send({
                    name: ch.header.content?.title?.text.text,
                    picture: (ch.metadata.avatar as any)[0],
                    subscribers: ch?.header?.content?.metadata?.metadata_rows[1]?.metadata_parts[0].text.text,
                    handle: ch?.header?.content?.metadata?.metadata_rows[0]?.metadata_parts[0].text.text?.toLowerCase(),
                    type: 'PageHeader',
                });
            }
        }
    } catch (err) {
        res.status(500).send({ status: 500, message: 'Unexpected error' });
        console.log(err);
    }
}
