import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export function Form() {
    const [isGuest, setIsGuest] = useState(false);
    const [attendance, setAttendance] = useState("Да");
    const form = useRef<HTMLFormElement | null>(null);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        emailjs
            .sendForm(
                "service_4nv4paq",
                "template_oac7l5d",
                form.current,
                "mmx_1VSvo3nkBXigu"
            )
            .then(() => {
                form.current?.reset();
                setAttendance("Да"); // reset attendance
                setIsGuest(false);   // reset guest
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="flex items-center justify-center p-4">
            <form
                ref={form}
                onSubmit={sendEmail}
                className="fieldset  w-full max-w-lg bg-base-200 border border-base-300 rounded-lg p-6 text-2xl text-wrap"
            >
                <h2 className="text-3xl font-bold mb-4">Ще присъствате ли?</h2>

                {/* Основен гост */}
                <label className="label font-bold">Име и фамилия</label>
                <input className="input input-xl mb-2 w-full" type="text" name="name" required />

                <label className="label font-bold">Имейл</label>
                <input className="input input-xl mb-2 w-full" type="email" name="email" required />

                <label className="label font-bold">Телефон</label>
                <input className="input input-xl mb-2 w-full" type="tel" name="phone" required />

                <label className="label font-bold mt-2 text-balance">Ще присъствате ли?</label>
                <div className="flex gap-4 mb-4">
                    <input
                        type="radio"
                        name="attendance"
                        value="Да"
                        checked={attendance === "Да"}
                        className="radio"
                        onChange={(e) => setAttendance(e.target.value)}
                    />
                    <label>Да</label>
                    <input
                        type="radio"
                        name="attendance"
                        value="Не"
                        checked={attendance === "Не"}
                        className="radio"
                        onChange={(e) => setAttendance(e.target.value)}
                    />
                    <label>Не</label>
                </div>

                {/* Скриване на меню и настаняване ако attendance === "Не" */}
                {attendance === "Да" && (
                    <>
                        {/* Избрано меню */}
                        <label className="label font-bold text-wrap">Избрано меню</label>
                        <select name="menu" className="select select-xl mb-4 w-full" defaultValue="" required>
                            <option value="" disabled>Изберете меню</option>
                            <option value="Пилешко">Пилешко</option>
                            <option value="Свинско">Свинско</option>
                            <option value="Вегетарианско">Вегетарианско</option>
                        </select>

                        {/* Checkbox за гост */}
                        <div className="flex items-center gap-2 mb-4">
                            <input
                                type="checkbox"
                                name="guest"
                                className="checkbox"
                                checked={isGuest}
                                onChange={(e) => setIsGuest(e.target.checked)}
                            />
                            <label className="label font-bold text-balance">Ще доведете ли гост?</label>
                        </div>

                        {/* Гост секция */}
                        {isGuest && (
                            <fieldset className="border p-4 rounded-lg mb-4">
                                <legend className="font-bold">Данни за гост</legend>

                                <label className="label font-bold mt-2">Име и фамилия</label>
                                <input className="input input-xl mb-2 w-full" type="text" name="guest_name" required />

                                <label className="label font-bold">Имейл</label>
                                <input className="input input-xl mb-2 w-full" type="email" name="guest_email" required />

                                <label className="label font-bold">Телефон</label>
                                <input className="input input-xl mb-2 w-full" type="tel" name="guest_phone" required />

                                <label className="label font-bold">Избрано меню</label>
                                <select name="guest_menu" className="select select-lg mb-2 w-full" defaultValue="" required>
                                    <option value="" disabled>Изберете меню</option>
                                    <option value="Пилешко">Пилешко</option>
                                    <option value="Свинско">Свинско</option>
                                    <option value="Вегетарианско">Вегетарианско</option>
                                </select>
                            </fieldset>
                        )}

                        {/* Настаняване */}
                        <label className="label font-bold mt-2 text-balance">Желаеш ли настаняване?</label>
                        <div className="flex gap-4 mb-4">
                            <input type="radio" className="radio" name="accommodation" value="Да" defaultChecked />
                            <label>Да</label>
                            <input type="radio" className="radio" name="accommodation" value="Не" />
                            <label>Не</label>
                        </div>
                    </>
                )}

                {/* Бележка */}
                <label className="label font-bold">Бележка</label>
                <textarea className="textarea textarea-xl mb-4 w-full" name="notes" placeholder="Бележка"></textarea>

                <button type="submit" className="btn btn-primary w-full text-lg">Изпрати</button>
            </form>
        </div>
    );
}