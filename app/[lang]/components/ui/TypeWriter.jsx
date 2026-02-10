"use client"

import Typewriter from 'typewriter-effect';

export default function TypeWriterComponent({ lang }) {
  return (
    <Typewriter
      options={{
        strings: lang === 'en' ? [
          "The right people for the right job",
          "Your skill, your opportunity",
          "Connect. Work. Grow."
        ] : ['Veza između posla i majstora', 'Pravi ljudi za pravi posao', 'Novi poslovi, svaki dan', "Vaš zanat, vaša prilika"],
        autoStart: true,
        loop: true,
        delay: 60,
      }}
    />
  );
}