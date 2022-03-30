import { Emitter } from '@socket.io/component-emitter'
import {
  Encoder as DefaultEncoder,
  Decoder as DefaultDecoder,
} from 'socket.io-parser'
import superjson from 'superjson'

export enum PacketType {
  CONNECT,
  DISCONNECT,
  EVENT,
  ACK,
  CONNECT_ERROR,
  BINARY_EVENT,
  BINARY_ACK,
}

export interface Packet {
  type: PacketType
  nsp: string
  data?: any
  id?: number
  attachments?: number
}

export class Encoder extends DefaultEncoder {
  /**
   * Encode a packet into a list of strings/buffers
   */
  encode(packet: Packet) {
    if (packet.type === PacketType.EVENT) {
      const [event, ...args] = packet.data as [string, any[]]
      packet.data = [event, superjson.stringify(args)]
    }
    return super.encode(packet)
  }
}

interface DecoderReservedEvents {
  decoded: (packet: Packet) => void
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */
export class Decoder extends Emitter<{}, {}, DecoderReservedEvents> {
  private decoder = new DefaultDecoder()

  constructor() {
    super()
    this.decoder.on('decoded', (packet: Packet) => {
      this.onDecoded(packet)
    })
  }

  public add(obj: any) {
    this.decoder.add(obj)
  }

  public destroy() {
    this.decoder.destroy()
  }

  private onDecoded(packet: Packet) {
    if (packet.type === PacketType.EVENT) {
      const [event, args] = packet.data as [string, string]
      const parsedArgs: any[] = superjson.parse(args)
      packet.data = [event, ...parsedArgs]
    }
    this.emitReserved('decoded', packet)
  }
}
