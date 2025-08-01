import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const uploadAvatar = async (userId, file) => {
    const BUCKET = 'avatar';
    const ext = file.mimetype.split('/')[1];
    const path = `user-${userId}/avatar.${ext}`;
    const { data, error } = await supabase.storage
        .from(BUCKET)
        .upload(path, file.buffer, {
            contentType: `image/${ext}`,
            cacheControl: 3600,
            upsert: true,
        });
    if (error) throw Error('I should make a supabase error!');
    const url = getPublicUrl(BUCKET, path);
    return url;
};

const getPublicUrl = (bucket, path) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
};

export { uploadAvatar };
