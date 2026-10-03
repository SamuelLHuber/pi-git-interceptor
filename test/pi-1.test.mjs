import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { load } from './pi-host.mjs';

test('Git hook policy covers direct and codemode-nested bash calls', async () => {
  const host = await load(resolve('index.ts'));
  for (const parentToolCallId of [undefined, 'codemode/1']) {
    const event = { toolName: 'bash', input: { command: 'git commit --no-verify' }, parentToolCallId };
    assert.equal((await host.emit('tool_call', event))[0].block, true);
    const allowed = { toolName: 'bash', input: { command: 'git status' }, parentToolCallId };
    await host.emit('tool_call', allowed);
    assert.match(allowed.input.command, /GIT_EDITOR=true/);
  }
  const event = { toolName: 'bash', input: { command: 'echo hello' } };
  await host.emit('tool_call', event);
  assert.equal(event.input.command, 'echo hello');
});
