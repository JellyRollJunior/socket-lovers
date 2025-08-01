import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const AVATAR_BUCKET = 'avatar';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const uploadAvatar = async (userId, file) => {
    const ext = file.mimetype.split('/')[1];
    const path = `user-${userId}/avatar.${ext}`;
    const { error } = await supabase.storage
        .from(AVATAR_BUCKET)
        .upload(path, file.buffer, {
            contentType: `image/${ext}`,
            cacheControl: 3600,
            upsert: true,
        });
    if (error) {
        const supabaseError = new Error('Unable to upload avatar');
        supabaseError.status = 500;
        supabaseError.name = 'Supabase error';
        throw supabaseError;
    }
    const url = getPublicUrl(AVATAR_BUCKET, path);
    return url;
};

const getPublicUrl = (bucket, path) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
};

export { uploadAvatar };
