import { Injectable } from '@nestjs/common';
import { StorageClient } from '@supabase/storage-js';

@Injectable()
export class SupabaseService extends StorageClient {
  constructor() {
    console.log(process.env.SUPABASE_URL);
    console.log(process.env.SUPABASE_API_KEY_ANON);

    super(process.env.SUPABASE_URL, {
      apikey: process.env.SUPABASE_API_KEY_ANON,
      Authorization: `Bearer ${process.env.SUPABASE_API_KEY_ANON}`,
    });
  }
}
