import React from "react";

import { Container } from "@components/layout/container";

export const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-base-300/50 py-6 text-sm">
          <div className="shrink-0 md:flex-1">© 2022, My App</div>

          <p className="order-1 basis-full text-center md:order-none md:basis-auto">
            My App
          </p>

          <div className="flex items-center justify-end md:flex-1">Contact</div>
        </div>
      </Container>
    </footer>
  );
};
