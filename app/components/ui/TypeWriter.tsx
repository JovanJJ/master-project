"use client"

import Typewriter from 'typewriter-effect';

export default function TypeWriterComponent() {
    return (
    <Typewriter
      options={{
        strings: ['Veza između posla i majstora', 'Pravi ljudi za pravi posao', 'Novi poslovi, svaki dan', "Vaš zanat, vaša prilika"],
        autoStart: true,
        loop: true,
        delay: 60,
      }}
    />
  );
}