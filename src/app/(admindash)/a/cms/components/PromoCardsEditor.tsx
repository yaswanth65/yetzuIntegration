import React from "react";
import { TextField, ImageUpload } from "./CMSField";

export function PromoCardsEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Promo Cards (3 cards)</h3>
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-lg mb-3 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Card {i}</h4>
            <TextField label="Theme (light/dark)" value={i === 2 ? "dark" : "light"} onChange={() => {}} />
            <TextField label="Title" value="Loren ipsum is free course now" onChange={() => {}} multiline />
            <TextField label="Description" value="Loren Ipsum meta description is display here, so you can lern and grwp with us..." onChange={() => {}} multiline />
            <ImageUpload label="Logo Image" dimensions="140 x 140" />
            <TextField label="Link Text" value="Learn more" onChange={() => {}} />
          </div>
        ))}
      </section>
    </div>
  );
}
