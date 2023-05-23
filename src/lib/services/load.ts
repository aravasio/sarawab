import fetch from 'node-fetch';
import type { Client } from '../types/Client';
debugger;

export async function load(): Promise<{ body: Client[] }> {
  const response = await fetch('http://sarasa.free.beeceptor.com');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: Client[] = await response.json();
  return { body: data };
}



